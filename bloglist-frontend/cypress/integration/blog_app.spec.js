describe('Blog app', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown by default', function(){
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function(){
    beforeEach(function(){
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        username: 'yun test',
        name: 'yun testtest',
        password: 'yuntestpassword'
      }

      const user2 = {
        username: 'yun test1.1',
        name: 'yun testtest1.1',
        password: 'yuntestpassword1.1'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.request('POST', 'http://localhost:3003/api/users/', user2)
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function(){
      cy.get('#username').type('yun test')
      cy.get('#password').type('yuntestpassword')
      cy.get('#login-button').click()
      cy.contains('yun testtest logged in')
    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('yun test')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('html').should('not.contain', 'yun testest logged in')

      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('contain', 'wrong username or password')
        .and('have.css', 'border-style', 'solid')
    })

    describe('when logged in', function(){
      beforeEach(function(){
        cy.login({ username: 'yun test', password: 'yuntestpassword' })
      })

      it('a new blog can be created', function(){
        cy.contains('create new blog').click()
        cy.get('#title').type('Title test1')
        cy.get('#author').type('Author test1')
        cy.get('#url').type('URL test1')
        cy.get('#createBlog').click()
        cy.contains('a new blog Title test1 Author test1 added')

        cy.get('.blog')
          .should('contain','view')
          .and('contain', 'Title test1, Author test1')
      })

      describe('And when a blog exists', function(){
        beforeEach(function(){
          cy.createBlog({
            title: 'Title test2',
            author: 'Author test2',
            url: 'URL test2'
          })
          cy.createBlog({
            title: 'Title test3',
            author: 'Author test3',
            url: 'URL test3'
          })
        })

        it('User can like a blog', function(){
          cy.contains('view').click()
          cy.get('.likesButton').click()
          cy.contains('Title test2').parent().contains('likes: 1')
        })

        it('User who created a blog have the access to delete that blog', function(){
          cy.contains('Title test2').parent().as('theBlog')
          cy.get('@theBlog').contains('view').click()
          cy.get('@theBlog').contains('remove').click()
        })

        it('User can only delete the blogs they created', function(){
          cy.contains('logout').click()
          cy.login({ username: 'yun test1.1', password: 'yuntestpassword1.1' })
          cy.contains('Title test2').parent().get('.removeButton').should('not.exist')
        })
      })
    })
  })
})
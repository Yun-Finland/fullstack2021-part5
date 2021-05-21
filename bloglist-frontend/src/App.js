import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog.js'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {

  const blogFormRef = useRef()

  const [ blogs, setBlogs] = new useState([])
  const [ message, setMessage ] = new useState({ content: null, style: null })
  const [ user, setUser ] = new useState(null)

  useEffect (() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [message])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  },[])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const resetMessage = () => {
    setTimeout(() => {
      setMessage({ content: null, style: null })
    },5000)
  }

  const createBlog = async (blogObject) => {

    blogFormRef.current.toggleVisibility()

    const returnedBlog = await blogService.create(blogObject)

    setBlogs(blogs.concat(returnedBlog))
    setMessage({ content: `a new blog ${returnedBlog.title} ${returnedBlog.author} added `,style: 'success' })

    resetMessage()
  }

  const updateLikes = async (blogObject) => {

    const returnedBlog = await blogService.update(blogObject.id, blogObject)
    setBlogs(blogs.map(blog => blog.id!== returnedBlog.id ? blog : returnedBlog))
    setMessage({ content: `Likes of blog ${returnedBlog.title} ${returnedBlog.author} is increased by 1`,style: 'success' })

    resetMessage()

  }

  const removeBlog = async (blogObject) => {

    await blogService.remove(blogObject.id)
    setMessage({ content: `Blog ${blogObject.title} ${blogObject.author} has been removed successfully`, style: 'error' })
    setBlogs(blogs.filter(blog => blog.id !== blogObject.id))

    resetMessage()
  }

  const blogForm = () => {
    return(
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm user = {user} createBlog={createBlog}/>
      </Togglable>
    )
  }

  return (
    <div className="App">
      <h1>
        {user === null ? 'Log in to application' : 'Blogs' }
      </h1>

      <Notification id="notification" message = {message} />

      {user === null
        ? <LoginForm setUser={setUser} setMessage ={setMessage} />
        : <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          { blogForm() }
          { blogs
            .sort((a,b) => b.likes - a.likes)
            .map(blog => {
              return (
                <ul key = {blog.id}>
                  <Blog blog ={blog} user={user} updateLikes={updateLikes} removeBlog={removeBlog}/>
                </ul>
              )})
          }
        </div>
      }
    </div>
  )
}

export default App

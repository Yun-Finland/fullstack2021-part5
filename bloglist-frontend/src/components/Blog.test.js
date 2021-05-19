import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog.js'

describe('Button \'View\' will show the rest info (likes & urls)', () => {
  let component

  beforeEach(() => {
    const blog = {
      author: 'author of test1',
      title: 'title of test1',
      url: 'url of test1',
      likes: 7,
      user:'609cf234eb09cf4f14980e41'
    }

    const user = {
      username: 'yun',
      name: 'yunxiao',
      id: '609cf234eb09cf4f14980e41'
    }

    component = render(
      <Blog blog={blog} user={user}/>
    )
  })

  // Test for ex5.13
  test('Blog shows author and title by default, but not likes and url', () => {
    expect(component.container).toHaveTextContent(
      'title of test1'
    )

    expect(component.container).toHaveTextContent(
      'author of test1'
    )

    expect(component.container).not.toHaveTextContent(
      'url of test1'
    )

    expect(component.container).not.toHaveTextContent(
      '7'
    )
  })

  //test for ex5.14
  test('after clicking the button, likes & urls are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'url of test1'
    )

    expect(component.container).toHaveTextContent(
      '7'
    )

    expect(component.container).toHaveTextContent(
      'title of test1'
    )

    expect(component.container).toHaveTextContent(
      'author of test1'
    )
  })

})

//test 5.15
test('If the likes button is clicked twice, then the function should be executed twice', () => {

  const blog = {
    author: 'author of test1',
    title: 'title of test1',
    url: 'url of test1',
    likes: 7,
    user:'609cf234eb09cf4f14980e41'
  }

  const user = {
    username: 'yun',
    name: 'yunxiao',
    id: '609cf234eb09cf4f14980e41'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateLikes={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likesButton = component.container.querySelector('.likesButton')

  fireEvent.click(likesButton)
  fireEvent.click(likesButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})


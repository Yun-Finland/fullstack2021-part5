import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, act } from '@testing-library/react'
import BlogForm from './BlogForm.js'

//test 5.16
describe('<BlogForm /> updates parent state and calls onSubmit', () => {

  test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()

    const user = {
      username: 'yun',
      name: 'yunxiao',
      id: '609cf234eb09cf4f14980e41'
    }

    const component = render(<BlogForm user={user} createBlog={createBlog} />)

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: 'title test4' } })
    fireEvent.change(author, { target: { value: 'author test1' } })
    fireEvent.change(url, { target: { value: 'url test1' } })

    fireEvent.submit(form)
    await act(async () => {})

    expect((createBlog.mock.calls)[0][0].title).toBe('title test4')
  })
})
import React, { useState } from 'react'

const BlogForm = ({ user, createBlog }) => {

  const [ title, setTitle ] = new useState('')
  const [ author, setAuthor ] = new useState('')
  const [ url, setUrl ] = new useState('')

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user.id,
    }

    await createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h1>create new blog</h1>
        <div>
          Title:
          <input
            type = "text"
            value = {title}
            name = "title"
            onChange = {({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type = "text"
            value = {author}
            name = "author"
            onChange = {({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type = "text"
            value = {url}
            name = "url"
            onChange = {({ target }) => setUrl(target.value)}
          />
        </div>
        <button type = "submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
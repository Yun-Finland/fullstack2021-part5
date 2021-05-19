import React,{ useState } from 'react'

const Blog = ({ user, blog, updateLikes, removeBlog }) => {
  const [showAll, setShowAll] = new useState(false)

  const increaseLikes = (event) => {
    event.preventDefault()
    const blogObject = { ...blog, likes: blog.likes+1, }
    updateLikes(blogObject)
  }

  const removeHandle = (event) => {
    event.preventDefault()

    if(window.confirm('Are you sure you want to delelte this blog?')){
      removeBlog(blog)
    }
  }

  const showRestInfo = () => {
    return (
      <div className="showAllInfo">
        {blog.url}<br/>
        likes: {blog.likes} <button onClick={increaseLikes} className='likesButton'>like</button><br/>
        { blog.user.username }<br/>
        { blog.user.id === user.id
          ? <button className='removeButton' onClick={removeHandle}>remove</button>
          : null
        }
      </div>
    )
  }

  return (
    <div className='blog'>
      {blog.title}, {blog.author} <button className="showOrHide" onClick={() => {setShowAll(!showAll)}}>{showAll?'hide' : 'view'}</button>
      { showAll === true
        ? <div > {showRestInfo()} </div>
        : null
      }
    </div>
  )
}

export default Blog
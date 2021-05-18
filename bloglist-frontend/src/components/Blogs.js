import React,{ useState } from 'react'

const Blog = ({user, blog, updateLikes, removeBlog}) => {
  const [showAll, setShowAll] = new useState(false)
  const [currentBlog, setCurrentBlog ] = new useState(blog)

  const increaseLikes = (event)=>{
    event.preventDefault()
    const blogObject = {...currentBlog, likes: currentBlog.likes+1,}
    updateLikes(blogObject)  
    setCurrentBlog(blogObject)    
  }

  const removeHandle = (event) =>{
    event.preventDefault()

    if(window.confirm("Are you sure you want to delelte this blog?")){
       removeBlog(blog)
    }
  }

  const showRestInfo = () =>{
    return (
      <div>
        {currentBlog.url}<br/>
        likes: {currentBlog.likes} <button onClick={increaseLikes}>like</button><br/>      
        { currentBlog.user.username }<br/>  
        { currentBlog.user.id === user.id
          ? <button id='removeButton' onClick={removeHandle}>remove</button>
          : null
        }        
      </div> 
    )
  }

  return (
    <div className='blog'>
      {blog.title}, {blog.author} <button onClick={()=>{setShowAll(!showAll)}}>{showAll?"hide" : "view"}</button>
      { showAll === true
        ? <div> {showRestInfo()} </div>
        : null                
      }
    </div>
  )
}

const Blogs = ({user,blogs, updateLikes, removeBlog}) => blogs
  .sort((a,b)=>a.likes - b.likes)
  .map(blog => {
    return (
      <ul key = {blog.id}> 
        <Blog blog ={blog} user={user} updateLikes={updateLikes} removeBlog={removeBlog}/>
      </ul>
    )
    
})

export default Blogs
import React, { useState } from 'react'
import blogService from '../services/blogs.js'

const Blog = ({ blog, setMessage, setBlogs, blogs, user, handleLikes }) => {
  const [visible, setVisible] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleRemove = async () => {
    try {
      if (window.confirm('Are you sure about the deletion!')) {
        await blogService.deleteBlog(blog.id)
        setMessage('delete Successfully!')
        setBlogs(blogs.filter(Blog => Blog.id !== blog.id))
        setTimeout(() => {
          setMessage('')
        }, 5000)
      }
    } catch (error) {
      setMessage('delete Unsuccessfully!')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <span className='title'>{blog.title}</span> - <span className='author'>{blog.author}</span>
      <button className='btn-visible' onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      {visible ? (
        <>
          <div className='url'>
            {blog.url}
          </div>
          <div className='likes'>
            {blog.likes}
            <button className='likes-btn' onClick={handleLikes}>like</button>
          </div>
          <div className='creator'>
            {blog.user && blog.user.name}
          </div>
          {blog.user && user.id === blog.user.id ? (
            <button onClick={handleRemove}>Remove</button>
          ) : ''}
        </>
      ) : ''}
    </div>
  )
}

export default Blog
import React from 'react'
import blogService from '../services/blogs.js'
import { useDispatch } from 'react-redux'
import { showNotification } from '../redux/slices/notificationSlice.js'
import { deleteBlog } from '../redux/slices/blogsSlice.js'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

const Blog = ({ blog, user, handleLikes }) => {
  const dispatch = useDispatch()

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
        dispatch(showNotification({ content: 'deleted successfully!', show: true }))
        dispatch(deleteBlog(blog.id))
        setTimeout(() => {
          dispatch(showNotification({ content: '', show: false }))
        }, 5000)
      }
    } catch (error) {
      dispatch(showNotification({ content: 'deleted Unsuccessfully!', show: true }))
      setTimeout(() => {
        dispatch(showNotification({ content: '', show: false }))
      }, 5000)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <Link to={`/blogs/${blog.id}`}><span className='title'>{blog.title}</span> - <span className='author'>{blog.author}</span></Link>
      <>
        <div className='url'>
          {blog.url}
        </div>
        <div className='likes'>
          {blog.likes}
          <Button variant='contained' className='likes-btn' onClick={handleLikes}>like</Button>
        </div>
        <div className='creator'>
          {blog.user && blog.user.name}
        </div>
        {blog.user && user.name === blog.user?.name ? (
          <Button variant='contained' onClick={handleRemove}>Remove</Button>
        ) : ''}
      </>
    </div>
  )
}

export default Blog
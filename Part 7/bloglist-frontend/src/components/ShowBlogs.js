import { useSelector, useDispatch } from 'react-redux/'
import { useRef } from 'react'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import Blog from './Blog'
import blogService from '../services/blogs'
import { showNotification } from '../redux/slices/notificationSlice'
import { likeBlog } from '../redux/slices/blogsSlice'
import { setBlogs } from '../redux/slices/blogsSlice'
import { setUser } from '../redux/slices/userSlice'
import { Button } from '@mui/material'

const ShowBlogs = ({ blogs }) => {
  let mutableBlogs = [...blogs]
  const sortedBlogs = mutableBlogs.sort((b, a) => a.likes - b.likes)

  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.user.loggedInUser)

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()

    dispatch(setBlogs(blogs))
  }

  const handleCreateBlog = async ({ title, author, url, likes }) => {
    const newBlog = {
      'title': title,
      'author': author,
      'url': url,
      'likes': likes
    }

    try {
      await blogService.postNewBlog(newBlog)
      dispatch(showNotification({ content: 'The new Blog is added successfully!', show: true }))
      setTimeout(() => {
        dispatch(showNotification({ content: '', show: false }))
      }, 3000)
      fetchBlogs()
      blogFormRef.current.setVisible(false)

    } catch (error) {
      dispatch(showNotification({ content: 'The new Blog is not added!!', show: true }))
      setTimeout(() => {
        dispatch(showNotification({ content: '', show: false }))
      }, 5000)
    }
  }

  const handleLikes = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      await blogService.updateLikes(updatedBlog, blog.id)
      dispatch(showNotification({ content: 'successfully liked!', show: true }))
      dispatch(likeBlog({ updatedBlog: updatedBlog, id: blog.id }))
      setTimeout(() => {
        dispatch(showNotification({ content: '', show: false }))
      }, 3000)
    } catch (error) {
      dispatch(showNotification({ content: 'Unsuccessfully liked!', show: true }))
      setTimeout(() => {
        dispatch(showNotification({ content: '', show: false }))
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(setUser(null))
  }

  return (
    <div>
      <p>{loggedInUser && loggedInUser.username} logged in<Button variant='contained' onClick={handleLogout}>Log out</Button></p>
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <CreateBlog
          handleCreateBlog={handleCreateBlog}
        />
      </Togglable>
      <div style={{ marginTop: '20px' }}>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={loggedInUser} handleLikes={() => handleLikes(blog)} />
        )}
      </div>
    </div>
  )
}

export default ShowBlogs

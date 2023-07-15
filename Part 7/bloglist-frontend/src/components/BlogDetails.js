import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comments from './Comments'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '../redux/slices/blogSlice'
import { Button } from '@mui/material'

const BlogDetails = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const blog = useSelector(state => state.blog[0])
  const dispatch = useDispatch()

  const fetchBlog = async () => {
    const response = await axios.get(`http://localhost:3003/api/blogs/${id}`)

    dispatch(setBlog(response.data))

    if (response.data.user) {
      const user = await axios.get(`http://localhost:3003/api/users/${response.data.user}`)

      setUser(user.data)
    }
  }

  useEffect(() => {

    fetchBlog()
  }, [])

  if (blog === null) {
    return null
  }

  console.log(blog)

  return (
    <div>
      <h2>{blog?.title}</h2>
      <a href='#'>{blog?.url}</a>
      <p>{blog?.likes} likes <Button variant='contained'>Like</Button></p>
      {user && <p>Added by {user?.name}</p>}
      {blog && <Comments comments={blog.comments} id={blog.id} fetchBlog={fetchBlog} />}
    </div>
  )
}

export default BlogDetails

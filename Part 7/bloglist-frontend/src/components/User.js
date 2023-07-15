import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:3003/api/users/${id}`)

      setUser(response.data)
    }

    fetchUser()
  }, [])

  if (user === null) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added Blogs</h4>
      <ul>
        {user.blogs.map(blog => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}><li>{blog.title}</li></Link>
        ))}
      </ul>
    </div>
  )
}

export default User

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs.js'
import loginService from './services/login'
import Togglable from './components/Togglable.js'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState()

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()

      setBlogs(blogs)
    }

    fetchBlogs()
    const user = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (user) {
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('Wrong username or password!')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleLikes = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const newBlog = await blogService.updateLikes(updatedBlog, blog.id)
      setMessage('successfully liked!')
      setBlogs(blogs.map(blog => {
        if (blog.id === newBlog.id) {
          return newBlog
        }

        return blog
      }))
      setTimeout(() => {
        setMessage('')
      }, 5000)
    } catch (error) {
      setMessage('UNsuccessfully liked!')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()

    setBlogs(blogs)
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
      setMessage('The new Blog is added successfully!')
      setTimeout(() => {
        setMessage('')
      }, 5000)
      fetchBlogs()
      blogFormRef.current.setVisible(false)

    } catch (error) {
      setMessage('The new Blog is not added!')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  const showBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((b, a) => a.likes - b.likes)

    return (
      <div>
        <p>{user.username} logged in<button onClick={handleLogout}>Log out</button></p>
        <Togglable buttonLabel='New Blog' ref={blogFormRef}>
          <CreateBlog
            handleCreateBlog={handleCreateBlog}
          />
        </Togglable>
        <div style={{ marginTop: '20px' }}>
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} user={user} handleLikes={() => handleLikes(blog)} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message && (
        <div style={{ border: '1px solid black', borderRadius: '10px' }}>
          <h3>{message}</h3>
        </div>
      )}
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        /> :
        showBlogs(blogs)
      }
    </div>
  )
}

export default App
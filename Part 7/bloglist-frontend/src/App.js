import { useState, useEffect } from 'react'
import blogService from './services/blogs.js'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './redux/slices/notificationSlice'
import { setBlogs } from './redux/slices/blogsSlice'
import { setUser } from './redux/slices/userSlice'
import { Routes, Route } from 'react-router-dom'
import ShowBlogs from './components/ShowBlogs.js'
import userService from './services/users'
import { setUsers } from './redux/slices/usersSlice.js'
import Users from './components/Users.js'
import User from './components/User.js'
import BlogDetails from './components/BlogDetails.js'
import NavBar from './components/NavBar.js'
import { Container, Alert } from '@mui/material'

const App = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const loggedInUser = useSelector(state => state.user.loggedInUser)
  const users = useSelector(state => state.users)

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()

    dispatch(setBlogs(blogs))
  }

  const fetchUsers = async () => {
    const users = await userService.getUsers()

    dispatch(setUsers(users))
  }

  useEffect(() => {
    fetchUsers()
    fetchBlogs()
    const user = JSON.parse(window.localStorage.getItem('loggedInUser'))
    if (user) {
      blogService.setToken(user.token)
      dispatch(setUser(user))
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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(showNotification({ content: 'Wrong username or password!', show: true }))
      setTimeout(() => {
        dispatch(showNotification({ content: '', show: false }))
      }, 3000)
    }
  }

  return (
    <Container>
      <div>
        <NavBar />
        <h2>blogs</h2>
        {notification.show && (
          <Alert>
            <h3>{notification.content}</h3>
          </Alert>
        )}
        {loggedInUser === null ?
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          /> : (
            <Routes>
              <Route path='/' element={<ShowBlogs blogs={blogs} />} />
              <Route path='/users' element={<Users users={users} />} />
              <Route path='/users/:id' element={<User />} />
              <Route path='/blogs/:id' element={<BlogDetails />} />
            </Routes>
          )
        }
      </div>
    </Container>
  )
}

export default App
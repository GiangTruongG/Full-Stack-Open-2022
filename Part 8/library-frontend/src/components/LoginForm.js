import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
      favGenre
    }
  }
`

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const [ login, result ] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      
      setToken(token)
      localStorage.setItem('logged-in-user-token', token)
      localStorage.setItem('favorite-genre', result.data.login.favGenre)
    }
  }, [result.data])

  const handleLogin = (e) => {
    e.preventDefault()

    login({ variables: { username, password }})

    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
      <div>
        username
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
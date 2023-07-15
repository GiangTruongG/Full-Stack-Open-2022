import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@mui/material'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <TextField
          label='Username'
          id='username'
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <TextField
          label='Password'
          id='password'
          type='text'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button style={{ marginTop: '10px' }} id='login-btn' type='submit' variant='contained'>
          Login
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm
import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Button, Toolbar } from '@mui/material'

const NavBar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Button color='inherit' component={Link} to='/'>
          Blogs
        </Button>
        <span> </span>
        <Button color='inherit' component={Link} to='/users'>
          Users
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar

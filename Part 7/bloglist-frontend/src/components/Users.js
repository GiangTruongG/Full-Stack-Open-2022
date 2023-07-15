import React from 'react'
import { Link } from 'react-router-dom'
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@mui/material'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableRow>
            <TableCell>User names</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell><Link to={`/users/${user.id}`}><td>{user.name}</td></Link></TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
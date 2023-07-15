import React, { useState } from 'react'
import axios from 'axios'
import { Button, TextField } from '@mui/material'

const Comments = ({ comments, id, fetchBlog }) => {
  const [comment, setComment] = useState()

  const handleComment = async (e) => {
    e.preventDefault()

    await axios.post(`http://localhost:3003/api/blogs/${id}/comments`, { comment: comment })

    fetchBlog()
  }

  if (!comments) {
    return null
  }

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <TextField
          label='comments'
          type='text'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant='contained' type='submit'>add comment</Button>
      </form>
      <ul>
        {comments?.map(comment => (
          <li key={comment} >{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
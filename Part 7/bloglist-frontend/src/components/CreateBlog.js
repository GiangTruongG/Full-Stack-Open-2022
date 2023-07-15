import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'

const CreateBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const setInputToBlank = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    setLikes('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    handleCreateBlog({ title, author, url, likes })
    setInputToBlank()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          label='Title:'
          className='title'
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <TextField
          label='Author:'
          className='author'
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <TextField
          label='URL:'
          className='url'
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <TextField
          label='Likes:'
          className='likes'
          type='text'
          value={likes}
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <Button
        type='submit'
        className='btn-create'
        variant='contained'
      >
        Create
      </Button>
    </form>
  )
}

export default CreateBlog

import React, { useState } from 'react'

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
        <label>title:</label>
        <input
          className='title'
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <label>author:</label>
        <input
          className='author'
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label>url:</label>
        <input
          className='url'
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <label>likes:</label>
        <input
          className='likes'
          type='text'
          value={likes}
          onChange={({ target }) => setLikes(target.value)}
        />
      </div>
      <button
        type='submit'
        className='btn-create'
      >
        Create
      </button>
    </form>
  )
}

export default CreateBlog
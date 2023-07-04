import React from 'react'
import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const creatAnecdote = async (event) => {
      event.preventDefault()
      const anecdote = event.target.anecdote.value
      event.target.anecdote.value = ''

      dispatch(appendAnecdote(anecdote))
      dispatch(showNotification(`you just created '${anecdote}'`, 3))
    }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={creatAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm

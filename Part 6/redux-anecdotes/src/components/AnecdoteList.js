import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      let mutableAnecdotes = [...state.anecdotes]
      return mutableAnecdotes.sort((a, b) => a.votes - b.votes)
    }

    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
  })
  
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(updateVotes(id))
    dispatch(showNotification(`you voted '${content}'`, 3))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )} 
    </div>
  )
}

export default AnecdoteList

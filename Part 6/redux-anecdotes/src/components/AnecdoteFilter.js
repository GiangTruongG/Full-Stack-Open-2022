import React from 'react'
import { useDispatch } from 'react-redux/es/exports'
import { filterAnecdote } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterAnecdote(event.target.value))
  }

  return (
    <form style={{ marginBottom: '10px' }}>
      <label>Filter</label>
      <input onChange={handleChange} />
    </form>
  )
}

export default AnecdoteFilter

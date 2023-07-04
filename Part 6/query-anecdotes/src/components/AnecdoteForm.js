import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../context/NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      notificationDispatch({ type: 'NOTIFICATION', payload: `Anecdote '${newAnecdote.content}' created` })

      setTimeout(() => {
        notificationDispatch({ type: 'HIDE_NOTIFICATION', payload: `Anecdote '${newAnecdote.content}' created` })
      }, 3000)
    },
    onError: () => {
      notificationDispatch({ type: 'NOTIFICATION', payload: `too short anecdote, must have length of at least 5 or more` })

      setTimeout(() => {
        notificationDispatch({ type: 'HIDE_NOTIFICATION', payload: '' })
      }, 3000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      content: content,
      votes: 0
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './context/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      "votes": anecdote.votes + 1
    })

    notificationDispatch({ type: 'NOTIFICATION', payload: `Anecdote '${anecdote.content}' voted` })

    setTimeout(() => {
      notificationDispatch({ type: 'HIDE_NOTIFICATION', payload: `Anecdote '${anecdote.content}' voted` })
    }, 3000)
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: 1
    }

  )

  const anecdotes = result.data

  console.log(result);

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  if (result.isError) {
    return <div><h2>Anecdote service not available due to problems in server</h2></div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery, useApolloClient, useSubscription } from '@apollo/client'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      genres
      published
    }
  }
`

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`

const ALL_BOOKS = gql`
query getBooks($genre: String!) {
  allBooks(
    genre: $genre
  ) {
    title
    author {
      name
      born
    }
    published
    genres
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_AUTHORS)

  const client = useApolloClient()

  const handleLogout = () => {
    localStorage.removeItem('logged-in-user-token')
    localStorage.removeItem('favorite-genre')

    setToken(null)
    client.resetStore()
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`
        A new book added with title "${addedBook.title}"
      `)

      client.cache.updateQuery({ query: ALL_BOOKS, variables: { genre: "" } }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
    }
  })

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} />

      <Recommend show={page === 'recommend'} />
    </div>
  )
}

export default App

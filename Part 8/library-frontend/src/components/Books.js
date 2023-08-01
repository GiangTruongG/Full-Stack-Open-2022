import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

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

const Books = (props) => {
  const genres = ['refactoring', 'agile', 'patterns', 'design', 'classic', 'crime', 'revolution', 'all genres']
  const [books, setBooks] = useState(null)
  const [genre, setGenre] = useState(null)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let result = useQuery(ALL_BOOKS, { variables: { genre: genre ? genre : "" }})

  useEffect(() => {
    const fetchBooks = () => {
      if (result.data) {
        setBooks(result.data.allBooks)
      }
    }

    fetchBooks()
  }, [result.data])

  if (!props.show) {
    return null
  }

  const handleFilterGenre = (genre) => {
    if (genre === 'all genres') {
      return setGenre("")
    }

    setGenre(genre)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => handleFilterGenre(genre)} >{genre}</button>
        ))}
      </div>
    </div>
  )
}

export default Books

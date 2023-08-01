import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const RECOMMEND_BOOKS = gql`
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

const Recommend = (props) => {
  const [recommendedBooks, setRecommendedBooks] = useState(null)
  const favGenre = localStorage.getItem('favorite-genre')
  const result = useQuery(RECOMMEND_BOOKS, { variables: { genre: favGenre }})

  useEffect(() => {
    const fetchBooks = () => {
      if (result.data) {
        setRecommendedBooks(result.data.allBooks)
      }
    }

    fetchBooks()
  }, [result.data])

  if (!props.show) {
      return null
    }

  return (
    <div>
      <h2>Recommend</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
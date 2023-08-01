import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Select from 'react-select'

const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $year: Int!) {
    editAuthor(
      name: $name
      setBornTo: $year
    ) {
      name
      born
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

const SetBirthYear = ({ authors }) => {
  const [selectedName, setSelectedName] = useState(null)
  const [year, setYear] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  })

  const handleUpdateAuthor = (e) => {
    e.preventDefault()

    updateAuthor({ variables: { name: selectedName.value, year: Number(year) }})

    setYear('')
  }

  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name,
    }
  })

  return (
    <form onSubmit={handleUpdateAuthor}>
      <div>
          name
          <Select 
            defaultValue={selectedName}
            onChange={setSelectedName}
            options={options}
          />
        </div>
        <div>
          year
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
    </form>
  )
}

export default SetBirthYear
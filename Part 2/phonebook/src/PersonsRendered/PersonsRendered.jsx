import React from 'react'
import Person from '../Person/Person'

const PersonsRendered = ({ searchTerm, searchResult, persons, handleDelete }) => {
  return (
    <div>
        {searchTerm ? searchResult.map(person => (
            <Person name={person.name} number={person.number} handleDelete={handleDelete} id={person.id} />
        )) : persons.map(person => (
            <Person name={person.name} number={person.number} handleDelete={handleDelete} id={person.id} />
        ))}
    </div>
  )
}

export default PersonsRendered
import React from 'react';

const Person = ({ name, number, id, handleDelete }) => {
  return (
    <p><span>{name}</span> <span>{number}</span>
      <button onClick={() => handleDelete(id)}>delete</button>
    </p>
  )
}

export default Person
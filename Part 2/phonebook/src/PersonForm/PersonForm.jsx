import React from 'react'

const PersonForm = ({ handleSubmit, newName, handleInputName, newNumbers, handleInputNumbers }) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputName} />
        </div>
        <div>
          number: <input value={newNumbers} onChange={handleInputNumbers} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm
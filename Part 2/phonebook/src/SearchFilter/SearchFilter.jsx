import React from 'react'

const SearchFilter = ({ searchTerm, handleSearchField }) => {
  return (
    <div>
        <span>Filter shown with</span>
        <input value={searchTerm} onChange={handleSearchField} />
    </div>
  )
}

export default SearchFilter
import React from 'react'

const LessThanTen = ({ countries, handleShow }) => {
    if (countries === []) {
        return null;
    }

  return (
    <>
        {countries.map(country => (
            <p>
                <span>{country.name.common}</span>
                <button onClick={() => handleShow(country.cca2)}>Show</button>
            </p>
        ))}
    </>
  )
}

export default LessThanTen
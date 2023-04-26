import React from 'react'

const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0);

  return (
    <>
        <p className='total'>Total of {total} exercises</p>
    </>
  )
}

export default Total
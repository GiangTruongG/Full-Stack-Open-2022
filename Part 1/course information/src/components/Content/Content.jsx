import React from 'react';
import Part from '../Part/Part';

const Content = ({ parts }) => {
  return (
    <>
      {parts?.map(part => (
        <Part part={part}  />
      ))}
    </>
  )
}

export default Content
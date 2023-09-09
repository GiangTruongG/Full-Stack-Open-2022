import React from 'react'
import Part from './Part';
import { CoursePart } from '../types';

const Content = ({ courseParts }: { courseParts: CoursePart[]}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  // const renderedCourseParts = courseParts.map(part => {
  //   switch (part.kind) {
  //     case 'basic':
  //       return <Part name={part.name} />
  //       break;
  //     case 'group':
  //       return <Part name={part.name} />
  //       break;
  //     case 'background':
  //       return <Part name={part.name} />
  //       break;
  //     default:
  //       return null
  //       break;
  //   }
  // })

  return (
    <div>
      {courseParts.map(course => (
        <Part part={course} key={course.name} />
      ))}
      {/* {renderedCourseParts} */}
    </div>
  )
}

export default Content

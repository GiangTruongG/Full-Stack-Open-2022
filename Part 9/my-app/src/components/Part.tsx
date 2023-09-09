import React from 'react'
import { CoursePart } from '../types';

const Part = ({ part }: { part: CoursePart } ) => {

  return (
    <>
      <h3>{part.name} {part.exerciseCount}</h3>
      {(() => {
        switch (part.kind) {
          case "basic":
            return (
              <div>
                <p>{part.description}</p>
              </div>
            );
          case "group":
            return (
              <div>
                <p>Project exercises {part.groupProjectCount}</p>
              </div>
            );
          case "background":
            return (
              <div>
                <p>{part.description}</p>
                <p>{part.backgroundMaterial}</p>
              </div>
            );
          case "special":
            return (
              <div>
                <p>{part.description}</p>
                <p>required skills: {part.requirements.map(requirement => (
                  <span key={requirement}>{requirement}, </span>
                ))}</p>
              </div>
            );
          default:
            return null;
        }
      })()}
    </>
  )
}

export default Part

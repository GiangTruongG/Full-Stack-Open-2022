import React from 'react';

const Notification = ({ message, isAnError }) => {
    if (message === '') {
        return null;
    }

  return (
    <div className={isAnError ? 'error' : 'notification'}>
        {message}
    </div>
  )
}

export default Notification
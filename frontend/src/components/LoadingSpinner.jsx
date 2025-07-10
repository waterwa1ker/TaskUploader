import React from 'react';

function LoadingSpinner({ small = false }) {
  return (
    <div className={`loading-spinner ${small ? 'small' : ''}`}>
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;

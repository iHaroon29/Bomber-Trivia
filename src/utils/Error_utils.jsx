import React from 'react'

export const ErrorComponent = ({ error, resetErrorBoundary }) => {
  return (
    <div className='bg-white text-black text-center'>
      <p>Something went wrong</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button
        className='bg-lime-700 text-white ease-in-out duration-300 hover:bg-white hover:text-black'
        onClick={resetErrorBoundary}
      >
        Return to Home-Page
      </button>
    </div>
  )
}

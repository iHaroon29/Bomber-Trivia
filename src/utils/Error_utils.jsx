import React from 'react'

export const ErrorComponent = ({ error, resetErrorBoundary }) => {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <div className='bg-gray-100 rounded px-4 py-4' style={{maxWidth:600}}>
        <h1 className='text-center pb-8 text-2xl font-bold'>Something went wrong</h1>
        <pre style={{ color: 'red' }}>{error.message}</pre>
      </div>
      <div className='fixed bottom-0 w-full flex flex-col items-center px-4 py-8'>
        <button
          className={`bg-green-700 text-white p-2 rounded-lg flex justify-center items-center h-16 text-black font-bold w-full`}
          style={{ maxWidth: 600 }}
          onClick={resetErrorBoundary}
        >
          BACK TO START
        </button>
      </div>
    </div>
  )
}

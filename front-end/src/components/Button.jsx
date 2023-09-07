import React from 'react'

export default function Button({handleSubmit, children}) {
  return (
    <button 
        onClick={handleSubmit}
        className='flex text-white justify-center px-8 bg-blue-500 w-48 min-w-fit py-3 font-medium items-center rounded-md gap-3'
    >{children}</button>
  )
}

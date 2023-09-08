import React from 'react'

export default function Button({handleSubmit, children, disable}) {
  return (
    <button 
        disabled={disable===undefined ? false : disable}
        onClick={handleSubmit}
        className={`${disable && ' cursor-not-allowed'} flex text-white justify-center px-8 bg-blue-500 w-48 min-w-fit py-3 font-medium items-center rounded-md gap-3`}
    >{children}</button>
  )
}

import React from 'react'
import deleteIcon from '../assets/icons/icons8-basura-llena-48.svg'

const DeleteButton = () => {
  return (
    <div className="flex w-full flex-row justify-end">
      <button
        className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-red-300 px-3 py-2 hover:bg-red-400"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <img src={deleteIcon} alt="delete icon" className="w-5" />
      </button>
    </div>
  )
}

export default DeleteButton

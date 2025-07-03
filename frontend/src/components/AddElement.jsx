import addIcon from '../assets/icons/icons8-más-50.svg'
import { useState } from 'react'
import Modal from 'react-modal'

const AddElement = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  })

  const handleForm = () => {
    setModalOpen(true)
  }
  return (
    <div className="sticky top-2 z-10 self-center">
      <button
        type="button"
        className="flex cursor-pointer items-center gap-2 rounded-lg bg-yellow-300 px-3 py-2 text-lg font-semibold shadow-md hover:bg-yellow-400"
        onClick={handleForm}
      >
        <img src={addIcon} alt="add icon" />
        Add Element
      </button>
    </div>
  )
}

export default AddElement

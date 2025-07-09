import addIcon from '../assets/icons/icons8-más-50.svg'

const AddButton = ({ openForm }) => {
  return (
    <div className="sticky top-2 z-10 self-center">
      <button
        type="button"
        className="bg-btn-primary hover:bg-btn-hover flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-lg font-semibold shadow-md"
        onClick={openForm}
      >
        <img src={addIcon} alt="add icon" />
        Add Element
      </button>
    </div>
  )
}

export default AddButton

import { IoAddCircleOutline, IoTrashBinOutline } from 'react-icons/io5'

const MainButton = ({ label, icon, func, cancel }) => {
  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-lg font-semibold shadow-md 
        ${icon === 'add' && 'bg-btn-primary hover:bg-btn-main-hover w-45'} 
        ${icon == 'delete' && 'bg-red-300 hover:bg-red-400 w-30'} 
        `}
      onClick={func}
    >
      {icon === 'add' && <IoAddCircleOutline className="size-10" />}
      {icon === 'delete' && <IoTrashBinOutline className="size-10" />}
      {!cancel ? label : 'Cancel'}
    </button>
  )
}

export default MainButton

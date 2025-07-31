import { IoAddCircleOutline, IoTrashBinOutline } from 'react-icons/io5'

const MainButton = ({ label, icon, func, deleteActive, className }) => {
  const baseClasses =
    'flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 cursor-pointer'

  const iconClasses =
    icon === 'add'
      ? 'bg-[#CDDC39] hover:bg-[#a2af2e] text-[#000000] focus:ring-[#CDDC39]/30'
      : deleteActive
        ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500/30'
        : 'bg-[#607D8B] hover:bg-[#4c616b] text-white focus:ring-[#607D8B]/30'

  return (
    <button
      type="button"
      className={`${baseClasses} ${iconClasses} ${className || ''}`}
      onClick={func}
    >
      {icon === 'add' && <IoAddCircleOutline className="size-6" />}
      {icon === 'delete' && <IoTrashBinOutline className="size-6" />}
      {!deleteActive ? label : 'Cancel'}
    </button>
  )
}

export default MainButton

const FilterButton = ({ label, func, isActive }) => {
  return (
    <button
      className={`rounded-xl px-4 py-3 font-medium transition-all duration-200 focus:ring-2 focus:outline-none ${
        isActive
          ? 'bg-[#CDDC39] font-semibold text-[#000000] shadow-lg focus:ring-[#CDDC39]/30'
          : 'bg-white/50 text-[#607D8B] shadow-md hover:bg-[#607D8B] hover:text-white hover:shadow-lg focus:ring-[#607D8B]/30'
      }`}
      onClick={func}
    >
      {label}
    </button>
  )
}

export default FilterButton

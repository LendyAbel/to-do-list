const FilterButton = ({ label, func, isActive }) => {
  return (
    <>
      <button
        className={`cursor-pointer rounded-md p-3 ${
          isActive
            ? 'border-btn-hover bg-btn-primary font-bold'
            : 'bg-btn-inactive hover:bg-btn-hover'
        }`}
        onClick={func}
      >
        {label}
      </button>
    </>
  )
}

export default FilterButton

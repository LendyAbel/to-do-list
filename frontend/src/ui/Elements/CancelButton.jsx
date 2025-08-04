const CancelButton = ({ label, type = 'button', onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex-1 transform rounded-xl bg-[#607D8B] px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4c616b] hover:shadow-xl focus:ring-4 focus:ring-[#607D8B]/30 focus:outline-none"
    >
      {label}
    </button>
  )
}

export default CancelButton

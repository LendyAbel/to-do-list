const AcceptButton = ({
  label,
  loadingLabel,
  type = 'button',
  disable = false,
  isPending = false,
  className = '',
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      onClick={type === 'submit' ? onClick : null}
      disabled={disable}
      className={`${className} flex-1 w-1 transform rounded-xl bg-[#CDDC39] px-6 py-3 text-lg font-semibold text-[#000000] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#a2af2e] hover:shadow-xl focus:ring-4 focus:ring-[#CDDC39]/30 focus:outline-none disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {isPending ? loadingLabel : label}
    </button>
  )
}

export default AcceptButton

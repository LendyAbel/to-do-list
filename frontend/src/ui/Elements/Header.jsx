const Header = ({ title = '', description = '' }) => {
  return (
    <div className="mb-2">
      <h2 className="text-2xl font-bold text-[#607D8B]">{title}</h2>
      <p className="text-sm text-[#9e9e9e]">{description}</p>
    </div>
  )
}

export default Header

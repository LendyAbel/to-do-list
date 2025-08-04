const TextInput = ({
  name = '',
  label = '',
  data,
  setData,
  value,
  clearError = () => {},
}) => {
  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-[#607D8B]"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={data?.title}
        onChange={(e) => {
          setData({ ...data, [value]: e.target.value })
          clearError()
        }}
        className="w-full rounded-xl border-2 border-gray-200 bg-[#F0F4C3]/30 px-4 py-3 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20 focus:outline-none"
        placeholder="Enter task title"
        required
      />
    </div>
  )
}

export default TextInput

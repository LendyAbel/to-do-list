const TextArea = ({name, label, data, setData, value}) => {
  return (
    <div className="spadivy-1">
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-[#607D8B]"
      >
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        value={data?.description}
        onChange={(e) =>
          setData({ ...data, [value]: e.target.value })
        }
        className="min-h-[120px] w-full resize-none rounded-xl border-2 border-gray-200 bg-[#F0F4C3]/30 px-4 py-3 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20 focus:outline-none"
        placeholder="Enter task description"
        required
      />
    </div>
  )
}

export default TextArea

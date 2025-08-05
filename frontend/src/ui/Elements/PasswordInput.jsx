import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const PasswordInput = ({
  label = '',
  name = '',
  data = {},
  setData = ()=>{},
  value = '',
  clearError = () => {},
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-[#607D8B]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setData({
              ...data,
              [value]: e.target.value,
            })
            clearError()
          }}
          required
          className="w-full rounded-xl border-2 border-gray-200 bg-[#F0F4C3]/30 px-4 py-3 pr-12 text-[#000000] placeholder-[#9e9e9e] transition-all duration-200 focus:border-[#AFB42B] focus:bg-white focus:ring-2 focus:ring-[#AFB42B]/20 focus:outline-none"
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 p-2 text-[#9e9e9e] transition-colors duration-200 hover:text-[#607D8B] focus:text-[#607D8B] focus:outline-none"
          onClick={(e) => {
            e.stopPropagation()
            setShowPassword(!showPassword)
          }}
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput

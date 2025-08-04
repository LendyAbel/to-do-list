import { FaExclamationTriangle } from 'react-icons/fa'

const ErrorMenssage = ({error}) => {
  return (
    <div className="mb-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
      <FaExclamationTriangle className="flex-shrink-0 text-red-500" size={20} />
      <p className="text-sm font-medium text-red-700">{error}</p>
    </div>
  )
}

export default ErrorMenssage

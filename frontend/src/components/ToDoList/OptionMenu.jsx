import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

import { HiOutlineMenu, HiX, HiOutlineLogout } from 'react-icons/hi'

const OptionMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const navigate = useNavigate()

  const menuVariants = {
    initial: { opacity: 0, scale: 0.95, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 },
    transition: { duration: 0.2 },
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    navigate('/login')
    setMenuOpen(false)
  }
  return (
    <div className="absolute right-5" ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#607D8B] text-white shadow-lg transition-all duration-200 hover:bg-[#4c616b] hover:shadow-xl focus:ring-2 focus:ring-[#607D8B]/30 focus:outline-none"
        aria-label="Menu"
      >
        {!menuOpen ? (
          <HiOutlineMenu className="h-5 w-5" />
        ) : (
          <HiX className="h-5 w-5" />
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            {...menuVariants}
            className="absolute top-12 right-0 z-50 w-48 rounded-xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm"
          >
            <div className="py-2">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-[#607D8B] transition-colors duration-200 hover:bg-[#F0F4C3]/30 focus:bg-[#F0F4C3]/30 focus:outline-none"
              >
                <HiOutlineLogout className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OptionMenu

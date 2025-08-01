import { useEffect, useState } from 'react'
import { UserContext } from '../useContext/userContext'

const HeroLayout = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userLogged = JSON.parse(localStorage.getItem('loggedBlogsappUser'))
    console.log(userLogged)
    setUser(userLogged)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AFB42B] via-[#AFB42B] to-[#607D8B]">
      {/* Hero Section */}

      <div className="relative overflow-hidden">
        <div className="relative px-6 py-2 sm:py-3 lg:py-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              <span className="block">TO DO</span>
              <span className="block text-[#F0F4C3] drop-shadow-lg">LIST</span>
            </h1>
            {!user ? (
              <p className="sm:text-md mx-auto max-w-2xl text-base leading-relaxed font-medium text-white/90">
                A simple and intuitive To Do List app that helps you organize
                tasks, set priorities, and track your progress efficiently.
              </p>
            ) : (
              <p className="mb-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">{`Welcome ${user.name}`}</p>
            )}
            <div className="mt-2 flex justify-center">
              <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#CDDC39] to-[#F0F4C3]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div>
        <UserContext.Provider value={{user, setUser}}>
          {children}
        </UserContext.Provider>
      </div>
    </div>
  )
}

export default HeroLayout

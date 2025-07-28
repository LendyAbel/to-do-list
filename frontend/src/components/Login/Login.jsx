import { useNavigate } from "react-router"

const Login = () => {
    let navigate = useNavigate()

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button onClick={()=>{navigate('/toDoList')}} className=" w-20 h-20 bg-amber-400">Login</button>
    </div>
  )
}

export default Login

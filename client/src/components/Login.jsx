import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      }

      const { data } = await axios.post(
        "https://my-chat-f28w.onrender.com/api/user/login",
        { email, password },
        config        
      )
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");      
    } catch (error) {
      toast.error("error occured")
      setLoading(false)
    }
  }

  return (
    <div className="w-full py-8 flex flex-col justify-center items-center">
      <ToastContainer />
      <form 
      onSubmit={handleSubmit}
      className='flex flex-col my-6 shadow-xl bg-slate-300 py-6 px-6 rounded-md'
      >
        <label className='py-3 text-xl font-poppins'>Email</label>
        <input 
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        type="text" placeholder='username' className='mb-3 font-poppins text-xl border px-4 py-2 rounded-md' />
        <label className='py-3 text-xl font-poppins'>Password</label>
        <input 
				value={password}
				onChange={(e) => setPassword(e.target.value)}
        required
        type="password" 
        placeholder='password' 
        className='mb-3 font-poppins text-xl border px-4 py-2 rounded-md' />
        <button type="submit" className='bg-blue-500 hover:bg-blue-600 py-2 rounded-md text-white text-xl font-poppins uppercase hover:scale-105'>Login</button>
      </form>
</div>
  )
}

export default Login
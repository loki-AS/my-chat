import React from 'react'
import { useState } from 'react'
import Login from "../components/Login"
import SignUp from "../components/SignUp"

const Home = () => {
    const [login, setLogin] = useState(false)

    const loginShow = login ? 'border-b-2 border-black text-slate-100 border-slate-100' : 'text-gray-500';

    const SignInShow = !login ? 'border-b-2 border-black text-slate-100 border-slate-100' : 'text-gray-500';

  return (
    <div className='px-6 sm:px-16'>

        <div className='flex justify-center py-6'>
        <h1 className='text-2xl uppercase font-bold tracking-[1px] font-poppins bg-slate-100 py-2 px-4 rounded-lg hover:scale-105 cursor-pointer'>Pocket chat</h1>
        </div>

        <div className='flex justify-center items-center'>
            
            <h1 
            className={`uppercase cursor-pointer text-2xl mx-5 font-poppins font-semibold ${loginShow}`}
            onClick={() => setLogin(true)}
            >
            Login
            </h1>
            <h1
            className={`uppercase cursor-pointer text-2xl font-poppins font-semibold mx-5 ${SignInShow}`}
            onClick={() => setLogin(false)}
            >
            Sign Up
            </h1>
        </div>

        <div>
        {login ? 
        (<>
        <Login />
        </>) : (
        <>
        <SignUp />
        </>)}
        </div>
    </div>
  )
}

export default Home
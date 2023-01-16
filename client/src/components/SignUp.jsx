import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async(e) => {
    e.preventDefault()

    setPicLoading(true)

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      const { data } = await axios.post("http://localhost:3001/api/user", {
        name,
        email,
        password,
        pic,
      }, config)
      console.log(data);
      alert("registration successful")
      localStorage.setItem('userInfo', JSON.stringify(data))
      setPicLoading(false)
      navigate("/chat")
    } catch (error) {
      console.log(error)
      setPicLoading(false)
    }
  }

  const postDetails = (pics) => {
    setPicLoading(true)

    if(pics.type === "image/jpeg" || pics.type === "image/png"){
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "image-app");
      data.append("cloud_name", "dzntbbfug");
      fetch("https://api.cloudinary.com/v1_1/dzntbbfug/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else{
      alert("please select an Image")
      return
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
    
      <form 
      className='flex flex-col p-6 bg-slate-300 rounded-md shadow-lg'
      onSubmit={submitHandler}
      >
        <label className='font-poppins py-3 text-xl'>Name</label>
        <input 
        type="input"
        placeholder='name..'
        className='py-2 px-4 text-lg font-poppins rounded-md'
        onChange={(e) => setName(e.target.value)}
        required
        />
        
        <label className='font-poppins py-3 text-xl'>Email</label>
        <input 
        type="input"
        placeholder='email..'
        className='py-2 px-4 text-lg font-poppins rounded-md'
        onChange={(e) => setEmail(e.target.value)}
        required
        />

        <label className='font-poppins py-3 text-xl'>Password</label>
        <input 
        type="password"
        placeholder='password..'
        className='py-2 px-4 text-lg font-poppins rounded-md'
        onChange={(e) => setPassword(e.target.value)}
        required
        /> 

        <label className='font-poppins py-3 text-xl'>Image</label>
        <input 
        type="file"
        className='w-64 text-lg font-poppins truncate rounded-md lg:w-full'
        onChange={(e) => postDetails(e.target.files[0])}
        />

        <button type="submit" className='bg-blue-500 my-3 mt-5 hover:bg-blue-600 py-2 rounded-md text-white text-xl font-poppins uppercase hover:scale-105'>Sign in</button>     
      </form>
</div>
  )
}

export default SignUp
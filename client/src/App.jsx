import React from 'react'
import { Route, Routes } from "react-router-dom"
import Chat from './pages/Chat'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  )
}

export default App
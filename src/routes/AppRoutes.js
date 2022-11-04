import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import Login from '../views/Login'
import SignUp from '../views/SignUp'

const AppRoutes = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    
  )
}

export default AppRoutes

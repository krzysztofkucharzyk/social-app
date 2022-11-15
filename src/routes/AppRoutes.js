import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import Login from '../views/Login'
import SignUp from '../views/SignUp'

const AppRoutes = (props) => {
  return (
    
      <Routes>
        <Route path="/" element={<Home user={props.user} />} />
        <Route path="/Login" element={<Login user={props.user} setUser={props.setUser}/>} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    
  )
}

export default AppRoutes

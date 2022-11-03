import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from '../views/Home'
import Login from '../views/Login'
import SignUp from '../views/SignUp'

const AppRoutes = () => {
    return (
        // <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
            </Routes>
        //  </Router> 
    )
}

export default AppRoutes

import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
// import Home from './views/Home';
// import Login from './views/Login';
// import SignUp from './views/SignUp';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  axios.defaults.headers.common["Authorization"] = 
    "Bearer " + (user ? user.jwt_token : "")
  axios.defaults.headers.post["Content-type"] = "application/json"

console.log(user)

  return (
    <>
      <AppNav user={user} setUser={setUser}/>
      <AppRoutes setUser={setUser} user={user} />
    </>
  );
}

export default App;

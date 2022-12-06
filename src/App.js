import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
// import Home from './views/Home';
// import Login from './views/Login';
// import SignUp from './views/SignUp';
import Popup from './views/Popup';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [timePopup, setTimePopup] = useState(false);

  axios.defaults.headers.common["Authorization"] =
    "Bearer " + (user ? user.jwt_token : "")
  axios.defaults.headers.post["Content-type"] = "application/json"

  useEffect(() => {
    setTimeout(() => {
      setTimePopup(true);
    }, 5000);
  }, []);

  return (
    <>
      <AppNav user={user} setUser={setUser} timePopup={timePopup} setTimePopup={setTimePopup} />
      <AppRoutes user={user} setUser={setUser} timePopup={timePopup} setTimePopup={setTimePopup} />
      {!user && (
        <Popup
          timePopup={timePopup}
          setTimePopup={setTimePopup}
          user={user}
          setUser={setUser}
        />
      )}
    </>
  );
}

export default App;

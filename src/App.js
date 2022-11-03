import React from 'react';
import './App.css';
import AppNav from './components/AppNav';
import AppRoutes from './routes/AppRoutes';
// import Home from './views/Home';
// import Login from './views/Login';
// import SignUp from './views/SignUp';

function App() {
  return (
    <>
      
      <AppNav />
      <AppRoutes />
    </>
  );
}

export default App;

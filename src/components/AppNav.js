import React from 'react';
import { Link } from 'react-router-dom';
import './AppNav.css';

const AppNav = (props) => {

const handleLogout = () => {
  localStorage.removeItem('user');
  props.setUser('');
}


  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!props.user && (
            <li>
              <Link to="/Login">Login</Link>
            </li>
            )}
            {!props.user && (
            <li>
              <Link to="/SignUp">SignUp</Link>
            </li>
            )}
            {props.user && (
            <li>
              <Link to="/" onClick={handleLogout}>Log Out</Link>
            </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  )
}

export default AppNav

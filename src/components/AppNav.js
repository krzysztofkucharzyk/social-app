import React from 'react';
import { Link } from 'react-router-dom';
import './AppNav.css';

const AppNav = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/SignUp">SignUp</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default AppNav

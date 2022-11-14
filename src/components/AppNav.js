import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import './AppNav.css';

const AppNav = (props) => {

  const handleLogout = () => {

    axios.post('https://akademia108.pl/api/social-app/user/logout')
      .then(res => {
        let resData = res.data
        if (resData.message) {
          // localStorage.removeItem('user');
          localStorage.setItem('user', null);
          props.setUser(null);
        }
        console.log(res.data)
      })
      .catch(error => console.log(error))
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

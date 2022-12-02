import axios from 'axios';
import React, { useState } from 'react';
import "./SignUp.css";

const username_regex = /^[a-zA-Z][a-zA-Z0-9-_]{4,23}[^\s]*/;
const email_regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@$%])(?=.{8,})$/

const SignUp = (props) => {


  const [signUpMessage, setSignUpMessage] = useState("");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    axios.post('https://akademia108.pl/api/social-app/user/signup', JSON.stringify(newUser))
      .then((res) => {
        console.log(res.data);
        let resData = res.data;


      })
      .catch((error) => {
        console.log(error);
      })
    }

    return (
      <section className="SignUp">
        <div className="signup-form">
          <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="content">
              <div className="input-field">
                <input
                  name="username"
                  value={data["username"]}
                  type="text"
                  placeholder="Username"
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-field">
                <input
                  name="email"
                  value={data["email"]}
                  type="text"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-field">
                <input
                  name="password"
                  type="text"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-field">
                <input
                  name="repassword"
                  type="password"
                  placeholder="Repeat password"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="action">
              <button>SIGN UP</button>
            </div>
          </form>
        </div>
        <div className="error_msg">{signUpMessage}</div>
      </section>
    )
  }

export default SignUp;

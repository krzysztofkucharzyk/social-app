import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Login.css'

const Login = () => {

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [loginMessage, setLoginMessage] = useState("");

  const handleInputChange = (e) => {
    const newdata = { ...data }
    newdata[e.target.name] = e.target.value
    setData(newdata)

    console.log(newdata)

    // setData({ ...data, [e.target.name]: e.target.value });

    // const { name, value } = e.target;
    // setData({
    //   ...data,
    //   [name]: value
    // })
  }

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data))
  }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();

    axios.post('https://akademia108.pl/api/social-app/user/login', {
      username: data.username,
      password: data.password
    })
      .then(res => {
        // const savedData = JSON.parse(localStorage.getItem('data'))
        //   setData(savedData);
        setData(JSON.parse(localStorage.getItem('data')));
        console.log("Zapisywanie danych do API", { data })
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }


  return (
    <section className='Login'>
      <div className="login-form">
        <form onSubmit={onSubmit}>
          <h1>Login</h1>
          <div className="content">
            <div className="input-field">
              <input name='username' value={data["username"]} type="text" placeholder="Username" onChange={handleInputChange} />
            </div>
            <div className="input-field">
              <input name='password' type="password" placeholder="Password" onChange={handleInputChange} />
            </div>
          </div>
          <div className="action">
            <button>LOGIN</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login

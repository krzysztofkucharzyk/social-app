import axios from 'axios';
import React, { useState } from 'react'
import './Login.css'

const Login = (props) => {

  const [loginMessage, setLoginMessage] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });



  const handleInputChange = (e) => {
    const newdata = { ...data }
    newdata[e.target.name] = e.target.value
    setData(newdata)

    // console.log(newdata)

    // setData({ ...data, [e.target.name]: e.target.value });

    // const { name, value } = e.target;
    // setData({
    //   ...data,
    //   [name]: value
    // })
  }

  // useEffect(() => {
  //   localStorage.setItem('data', JSON.stringify(data))
  // }, [data]);

  const onSubmit = (e) => {
    e.preventDefault();

    let user = {
      username: data.username,
      password: data.password,
    }

    axios.post('https://akademia108.pl/api/social-app/user/login',
      JSON.stringify(user)
    )
      .then(res => {
        let resData = res.data;
        console.log(resData)
        if (Array.isArray(resData.username)) {
          setLoginMessage(resData.username[0])
        } else if (Array.isArray(resData.password)) {
          setLoginMessage(resData.password[0])
        } else if (resData.error) {
          setLoginMessage("Incorrect username of password")
        } else {
          setLoginMessage('')
          localStorage.setItem('user', JSON.stringify(resData))
          props.setUser(resData)
        }
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

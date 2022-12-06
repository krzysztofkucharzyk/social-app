import axios from "axios";
import React, {useState} from "react";
import "./SignUp.css";

// const username_regex = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}[^\s]*$/;
// const username_regex = /^(?=.{3,20}$)(?![^\s])(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const email_regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@$%])(?=.{5,})$/;

const SignUp = () => {
  const [signUpMessage, setSignUpMessage] = useState("");
  const [signUpDone, setSignUpDone] = useState(false);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const handleInputChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  const validate = (e) => {
    // e.preventDefault();

    let validateErrors = {
      username: false,
      email: false,
      password: false,
      repassword: false,
    };

    // Username
    if (data.username.trim().length < 4) {
      validateErrors.username = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "Username should have at least 4 characters",
        };
      });
    } else if (!/^[^\s]*$/.test(data.username.trim())) {
      validateErrors.username = true;
      setErrors((prevErrors) => {
        return {...prevErrors, username: "Username cannot contain whitespaces"};
      });
    } else {
      validateErrors.username = false;
      setErrors((prevErrors) => {
        return {...prevErrors, username: ""};
      });
    }

    //Email
    if (
      !email_regex.test(data.email.trim()) ||
      data.email.trim().length === 0
    ) {
      validateErrors.email = true;
      setErrors((prevErrors) => {
        return {...prevErrors, email: "This is no valid email"};
      });
    } else {
      validateErrors.email = false;
      setErrors((prevErrors) => {
        return {...prevErrors, email: ""};
      });
    }

    //Password
    if (data.password.trim().length < 6) {
      validateErrors.password = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Password should have at least 6 characters",
        };
      });
    } else if (!/^[^\s]*$/.test(data.password.trim())) {
      validateErrors.password = true;
      setErrors((prevErrors) => {
        return {...prevErrors, password: "Password cannot contain whitespaces"};
      });
    } else if (!/\d/.test(data.password.trim())) {
      validateErrors.password = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Password should have at least 1 number",
        };
      });
    } else if (!/[!@#$%]/.test(data.password.trim())) {
      validateErrors.password = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password:
            "Password should have at least 1 of the special characters like: !, @, #, $, %",
        };
      });
    } else {
      validateErrors.password = false;
      setErrors((prevErrors) => {
        return {...prevErrors, password: ""};
      });
    }

    //Repeat password
    if (
      data.repassword.trim() !== data.password.trim() ||
      data.repassword.trim().length === 0
    ) {
      validateErrors.repassword = true;
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          repassword: "Password do not match",
        };
      });
    } else {
      validateErrors.repassword = false;
      setErrors((prevErrors) => {
        return {...prevErrors, repassword: ""};
      });
    }

    return (
      !validateErrors.username &&
      !validateErrors.email &&
      !validateErrors.password &&
      !validateErrors.repassword
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // sprawdzenie walidacji czy udana czy nie
    if (!validate()) {
      return;
    }

    let newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    axios
      .post(
        "https://akademia108.pl/api/social-app/user/signup",
        JSON.stringify(newUser)
      )
      .then((res) => {
        console.log(res.data);

        setSignUpMessage("Sign Up completed");
        setSignUpDone(true);
        setData({
          username: "",
          email: "",
          password: "",
          repassword: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="SignUp">
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="content">
            <div className="input-field">
              <input
                name="username"
                value={data["username"]}
                type="text"
                placeholder="Username"
                disabled={signUpDone}
                onChange={handleInputChange}
              />
              <span>{errors.username}</span>
            </div>
            <div className="input-field">
              <input
                name="email"
                value={data["email"]}
                type="text"
                placeholder="Email"
                disabled={signUpDone}
                onChange={handleInputChange}
              />
              <span>{errors.email}</span>
            </div>
            <div className="input-field">
              <input
                name="password"
                value={data["password"]}
                type="text"
                placeholder="Password"
                disabled={signUpDone}
                onChange={handleInputChange}
              />
              <span>{errors.password}</span>
            </div>
            <div className="input-field">
              <input
                name="repassword"
                value={data["repassword"]}
                type="password"
                placeholder="Repeat password"
                disabled={signUpDone}
                onChange={handleInputChange}
              />
              <span>{errors.repassword}</span>
            </div>
          </div>
          <div className="action">
            <button disabled={signUpDone}>SIGN UP</button>
          </div>
        </form>
      </div>
      <div className="error_msg">{signUpMessage}</div>
    </section>
  );
};

export default SignUp;

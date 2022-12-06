import React from 'react'
import './Popup.css'
import LoginForm from '../components/LoginForm';


const Popup = (props) => {

  return (props.timePopup) ? (
    <div className='popup'>
      <LoginForm timePopup={props.timePopup} setTimePopup={props.setTimePopup} user={props.user} setUser={props.setUser}/>
      </div>
  ) : "";

}

export default Popup
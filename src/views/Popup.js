import React from 'react'
import './Popup.css'

const Popup = (props) => {

  return (props.timePopup) ? (
    <div>
      <h2>Popup</h2>
      <button className='btn-close' onClick={() => {props.setTimePopup(false)}}>close</button>

    </div>
  
  ) : "";
}

export default Popup
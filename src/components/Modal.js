import React from 'react'
import "./Modal.css"


const Modal = ({ closeModal, deletePost }) => {
  return (
    <div className="container">
      <div className="card">
        <div className="card_body_modal">
          <div className="card_body_modal_title">
            <h2>Are you sure you want to delete a post
              ?</h2>
          </div>
          <div className='card_body_modal_buttons'>
          <button onClick={deletePost} className="button button_yes">YES</button>
          <button onClick={() => closeModal(false)} className="button button_no">NO</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
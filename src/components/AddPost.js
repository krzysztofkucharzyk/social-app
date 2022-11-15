import React from 'react'
import './AddPost.css'
import './Post.css'

function AddPost(props) {

const onSubmit = (e) => {
  e.preventDefault();
}

  return (
    <div className='container'>
      <div className="card">
        <div className="card_body">
          <form onSubmit={onSubmit}>
            <textarea value={props.postContent} onChange={(e) => props.setPostContent(e.target.value)} />
            <div className='action'>
              <button type='submit'>ADD POST</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPost
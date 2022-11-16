import React from 'react';
import './Post.css';
import { FiHeart } from 'react-icons/fi';

const Post = (props) => {

  const getDate = (date) => {
    return date.slice(0, 10)
  }

  return (
    <div className='container'>
      <div className="card">
        <div className="card_body">
          <p>{props.post.content}</p>
          <div className="card_user">
            <img src={props.post.user.avatar_url} alt="avatar" />
            <div className="card_user_info">
              <h1>{props.post.user.username}</h1>
              <small>{getDate(props.post.created_at)}</small>
            </div>
            <div className='card_user_likes'>
              <FiHeart /> <span>{props.post.likes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
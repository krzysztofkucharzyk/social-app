import React, { useState } from 'react';
import './Post.css';
import { FiHeart } from 'react-icons/fi';
// import axios from 'axios';

const Post = (props) => {

  const [postContent, setPostContent] = useState('');

  // const addPost = () => {

  //   axios.post('https://akademia108.pl/api/social-app/post/add', {
  //     content: postContent,
  //   })
  //   .then(res => {
  //     let resData = res.data;
  //     if(resData.message) {
  //       setPostContent(postContent);
  //     }
  //     console.log(resData)
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  // }

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
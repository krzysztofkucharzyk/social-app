import axios from 'axios'
import React from 'react'
import './FollowRecommendations.css'

const FollowRecommendations = (props) => {

  const follow = () => {
    axios.post('https://akademia108.pl/api/social-app/follows/follow', {
      leader_id: props.recommendations.id
    })
      .then((res) => {
        console.log(res.data);
        props.getLatestPosts();
        props.getRecommendations();
      })
      .catch((error) => {
        console.log(error);
      })
  }


  return (
    <div className="card_user">
      <img src={props.recommendations.avatar_url} alt="avatar" />
      <h1>{props.recommendations.username}</h1>
      <button onClick={follow} type="submit" className='button follow'>FOLLOW</button>
    </div>
  )
}

export default FollowRecommendations
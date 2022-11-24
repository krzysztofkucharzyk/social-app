import React from 'react'
import './FollowRecommendations.css'

const FollowRecommendations = (props) => {

  return (
    <div className="container">
      <div className="card">
        <div className="card_body">
          <div className="card_user">
            <img src={props.recommendations.avatar_url} alt="avatar" />
            <div className="card_user_info">
              <h1>{props.recommendations.username}</h1>
            </div>
            <button type="submit follow">FOLLOW</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FollowRecommendations
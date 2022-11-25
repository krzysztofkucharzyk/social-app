import React from 'react'

const FollowedUsers = (props) => {

  return (
    <div className="card_user">
      <img src={props.followedUsers.avatar_url} alt="avatar" />
      <h1>{props.followedUsers.username}</h1>
    </div>
  )
}

export default FollowedUsers
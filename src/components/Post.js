import React from "react";
import "./Post.css";
import {
  RiDeleteBin7Fill,
  RiDeleteBin7Line,
  RiUserUnfollowFill,
  RiUserUnfollowLine,
} from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const Post = (props) => {
  const [isHoverF, setIsHoverF] = useState(false);
  const [isHoverD, setIsHoverD] = useState(false);
  const [isHoverL, setIsHoverL] = useState(false);

  const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);

  const [likesCount, setLikesCount] = useState(props.post.likes.length);
  const [doesUserLiked, setDoesUserLiked] = useState(props.post.likes.filter(like => like.username === props.user?.username).length !== 0);

  const getDate = (date) => {
    return date.slice(0, 10);
  };

  const deletePost = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/delete", {
        post_id: props.post.id,
      })
      .then((res) => {
        let resData = res.data;
        console.log("delete:", resData);
        if (resData.message) {
          // setDeleteModalDisplay(alert(resData.message));
          props.getLatestPosts();
        } else if (resData.errors) {
          alert("Invalid Operation. You have not sufficient permissions");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unfollow = (id) => {
    axios
      .post("https://akademia108.pl/api/social-app/follows/disfollow", {
        leader_id: id,
      })
      .then((res) => {
        let resData = res.data;
        console.log(resData);
        if (resData.message) {
          props.getRecommendations();
          props.getLatestPosts();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const likePost = (id, isLiked) => {
    axios.post("https://akademia108.pl/api/social-app/post/" + (isLiked ? 'dislike' : 'like'), {
      post_id: id,
    })
      .then((res) => {
        console.log(res.data)
        setLikesCount(likesCount + (isLiked ? -1 : 1));
        setDoesUserLiked(!isLiked);
        props.getLatestPosts();
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // https://akademia108.pl/api/social-app/post/like
  // https://akademia108.pl/api/social-app/post/dislike


  return (
    <div className="container">
      {deleteModalDisplay && (
        <Modal closeModal={setDeleteModalDisplay} deletePost={deletePost} />
      )}
      <div className="card">
        <div className="card_body">
          <p>{props.post.content}</p>
          <div className="card_user">
            <img src={props.post.user.avatar_url} alt="avatar" />
            <div className="card_user_info">
              <h1>{props.post.user.username}</h1>
              <small>{getDate(props.post.created_at)}</small>
            </div>
            {props.user && props.post.user.username !== props.user?.username && (
              <div
                className="card_user_unfollow"
                onMouseEnter={() => setIsHoverF(!isHoverF)}
                onMouseLeave={() => setIsHoverF(!isHoverF)}
                onClick={() => {
                  unfollow(props.post.user.id);
                  props.getFollowedUsers();
                }}
              >
                {isHoverF ? (
                  <RiUserUnfollowFill className="unfollow" title="unfollow" />
                ) : (
                  <RiUserUnfollowLine className="unfollow" title="unfollow" />
                )}
              </div>
            )}
            {props.user && props.post.user.username === props.user?.username && (
              <div
                className="card_user_delete"
                onMouseEnter={() => setIsHoverD(!isHoverD)}
                onMouseLeave={() => setIsHoverD(!isHoverD)}
                // onClick={deletePost}
                onClick={() => {
                  setDeleteModalDisplay(true);
                }}
              >
                {isHoverD ? (
                  <RiDeleteBin7Fill className="delete" title="Delete" />
                ) : (
                  <RiDeleteBin7Line className="delete" title="Delete" />
                )}
              </div>
            )}
            <div
              className="card_user_likes"
              onMouseEnter={() => setIsHoverL(!isHoverL)}
              onMouseLeave={() => setIsHoverL(!isHoverL)}
              onClick={() => {
                likePost(props.post.id, doesUserLiked);
              }}
            >
              {isHoverL || doesUserLiked ? (
                <AiFillHeart className="like" title="Like" />
              ) : (
                <AiOutlineHeart className="like" title="Like" />
              )}
              <span>{props.post.likes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

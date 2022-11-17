import React from "react";
import "./Post.css";
import {FiHeart} from "react-icons/fi";
import {RiDeleteBin2Line} from "react-icons/ri";
import {AiFillEdit, AiOutlineEdit} from "react-icons/ai"
import { useState } from "react";

const Post = (props) => {

  const [isHover, setIsHover] = useState(false);

  const getDate = (date) => {
    return date.slice(0, 10);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card_body">
          <p>{props.post.content}</p>
          <div className="card_user">
            <img src={props.post.user.avatar_url} alt="avatar" />
            <div className="card_user_info">
              <h1>{props.post.user.username}</h1>
              <small>{getDate(props.post.created_at)}</small>
            </div>
            {props.user && (
            <div className="card_user_edit" onMouseEnter={() => setIsHover(!isHover)} onMouseLeave={() => setIsHover(!isHover)}>
              {!isHover ? (
              <AiOutlineEdit className="edit" />
              ) : (
                <AiFillEdit className="edit" />
              )}
            </div>
            )}
            {props.user && (
            <div className="card_user_delete">
              <RiDeleteBin2Line className="delete" />
            </div>
            )}
            <div className="card_user_likes">
              <FiHeart className="like" />{" "}
              <span>{props.post.likes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

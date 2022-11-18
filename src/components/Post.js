import React from "react";
import "./Post.css";
import {RiDeleteBin7Fill, RiDeleteBin7Line} from "react-icons/ri";
import {
  AiFillEdit,
  AiOutlineEdit,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import {useState} from "react";
import axios from "axios";

const Post = (props) => {
  const [isHoverE, setIsHoverE] = useState(false);
  const [isHoverD, setIsHoverD] = useState(false);
  const [isHoverL, setIsHoverL] = useState(false);

  const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);

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
          setDeleteModalDisplay(alert(resData.message));
          props.getLatestPosts();
        } else if (resData.errors) {
          setDeleteModalDisplay(
            alert("Invalid Operation. You have not sufficient permissions")
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
              <div
                className="card_user_edit"
                onMouseEnter={() => setIsHoverE(!isHoverE)}
                onMouseLeave={() => setIsHoverE(!isHoverE)}
              >
                {isHoverE ? (
                  <AiFillEdit className="edit" />
                ) : (
                  <AiOutlineEdit className="edit" />
                )}
              </div>
            )}
            {props.user && (
              <div
                className="card_user_delete"
                onMouseEnter={() => setIsHoverD(!isHoverD)}
                onMouseLeave={() => setIsHoverD(!isHoverD)}
                onClick={deletePost}
              >
                {isHoverD ? (
                  <RiDeleteBin7Fill className="delete" />
                ) : (
                  <RiDeleteBin7Line className="delete" />
                )}
              </div>
            )}
            <div
              className="card_user_likes"
              onMouseEnter={() => setIsHoverL(!isHoverL)}
              onMouseLeave={() => setIsHoverL(!isHoverL)}
            >
              {isHoverL ? (
                <AiFillHeart className="like" />
              ) : (
                <AiOutlineHeart className="like" />
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

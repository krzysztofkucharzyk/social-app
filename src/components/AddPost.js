import axios from "axios";
import React, {useState} from "react";
import "./AddPost.css";
import "./Post.css";

function AddPost(props) {
  const [postContent, setPostContent] = useState("");
  const [message, setMessage] = useState("");

  const addPost = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/add", {
        content: postContent,
      })
      .then((res) => {
        let resData = res.data;
        let postContent = resData.post.content;
        console.log("resData:", resData);
        console.log("post content:", postContent);

        // if (postContent === '') {
        //   setMessage('Post content cannot be empty');
        // } else if ( resData.message ) {
        //   setPostContent(postContent);
        // }

        if (resData.message) {
          setPostContent(postContent);
          props.getPrevPost();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePostContent = (e) => {
    e.preventDefault();
    console.log("postContent:", postContent);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card_body">
          <form onSubmit={handlePostContent}>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="action">
              {/* <button type="submit" onClick={addPost}> */}
              <button type="submit" onClick={addPost}>
                ADD POST
              </button>
            </div>
          </form>
          <div className="error_msg">{message}</div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;

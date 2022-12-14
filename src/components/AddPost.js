import axios from "axios";
import React, {useState} from "react";
import "./AddPost.css";
import "./Post.css";

function AddPost(props) {
  const [postContent, setPostContent] = useState("");
  const [isNoContent, setIsNoContent] = useState("");

  const addPost = (e) => {
    e.preventDefault();

    if (!postContent) {
      setIsNoContent("Post content cannot be empty");
      return;
    }

    axios
      .post("https://akademia108.pl/api/social-app/post/add", {
        content: postContent,
      })
      .then((res) => {
        let resData = res.data;
        let postContent = resData.post.content;
        console.log("resData:", resData);
        console.log("post content:", postContent);

        if (resData.message) {
          setPostContent(postContent);
          props.getPrevPost();
          setPostContent("");
          setIsNoContent("");
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
          <form onSubmit={addPost}>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="action">
              {/* <button type="submit" onClick={addPost}> */}
              <button type="submit">ADD POST</button>
            </div>
          </form>
          <div className="error_msg">{isNoContent}</div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;

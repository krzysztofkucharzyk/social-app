import axios from "axios";
import React, {useState} from "react";
import "./AddPost.css";
import "./Post.css";

function AddPost(props) {
  const [postContent, setPostContent] = useState("");

  const addPost = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/add", {
        content: postContent,
      })
      .then((res) => {
        let resData = res.data;
        if (resData.message) {
          setPostContent(postContent);
        }
        console.log(resData);
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
              <button type="submit" onClick={() => {addPost(); props.getPrevPost();}}>
                ADD POST
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;

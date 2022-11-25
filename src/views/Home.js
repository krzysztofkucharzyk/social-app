import React, {useEffect, useState} from "react";
import axios from "axios";
import "./Home.css";
import Post from "../components/Post";
import AddPost from "../components/AddPost";
import FollowRecommendations from "../components/FollowRecommendations";
import FollowedUsers from "../components/FollowedUsers";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  const getLatestPosts = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/latest")
      .then((res) => {
        console.log("Pobieranie danych", res.data);
        setPosts(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getNextPosts = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/older-then", {
        date: posts[posts.length - 1].created_at,
      })
      .then((res) => {
        setPosts([...posts, ...res.data]);
        // setPosts(posts.concat(res.data))
        console.log("Pobieranie danych older-then", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPrevPost = () => {
    axios
      .post("https://akademia108.pl/api/social-app/post/newer-then", {
        date: posts[0].created_at,
      })
      .then((res) => {
        let resData = res.data;
        setPosts([...resData, ...posts]);
        // setPosts(resData.concat(posts))
        console.log("PObieranie danych newer-then", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRecommendations = () => {
    axios
      .post("https://akademia108.pl/api/social-app/follows/recommendations")
      .then((res) => {
        console.log("follow:", res.data);
        setRecommendations(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getFollowedUsers = () => {
    axios
      .post("https://akademia108.pl/api/social-app/follows/allfollows")
      .then((res) => {
        console.log("all followed:", res.data);
        setFollowedUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLatestPosts();
    getRecommendations();
    getFollowedUsers();
  }, []);

  return (
    <section className="Home">
      {props.user && (
        <div className="follows">
          <div className="container">
            <div className="card">
              <div className="card_heading">
                <h2>Users you can follow</h2>
              </div>
              <div className="card_body">
                {recommendations.map((rec) => {
                  console.log(rec);
                  return (
                    <FollowRecommendations
                      key={rec.id}
                      recommendations={rec}
                      getRecommendations={getRecommendations}
                      getLatestPosts={getLatestPosts}
                      getFollowedUsers={getFollowedUsers}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {props.user && (
        <div className="followed">
          <div className="container">
            <div className="card">
              <div class="card_heading">
                <h2>Users you follow</h2>
              </div>
              <div className="card_body">
                {followedUsers.map((followed) => {
                  console.log(followed);
                  return (
                    <FollowedUsers
                      key={followed.id}
                      followedUsers={followed}
                      getFollowedUsers={getFollowedUsers}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {props.user && <AddPost posts={posts} getPrevPost={getPrevPost} />}
      <div className="postList">
        {posts.map((post) => {
          return (
            <Post
              post={post}
              key={post.id}
              user={props.user}
              getLatestPosts={getLatestPosts}
              getRecommendations={getRecommendations}
              getFollowedUsers={getFollowedUsers}
            />
          );
        })}
      </div>
      <button onClick={getNextPosts} type="button" className="button">
        Load more
      </button>
    </section>
  );
};

export default Home;

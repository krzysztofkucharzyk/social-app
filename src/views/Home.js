import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'
import Post from '../components/Post';
import AddPost from '../components/AddPost';

const Home = (props) => {

  const [posts, setPosts] = useState([]);

  const getLatestPosts = () => {
    axios.post('https://akademia108.pl/api/social-app/post/latest')
      .then(res => {
        console.log("Pobieranie danych", res.data)
        setPosts(res.data)
      })
      .catch(error => console.log(error))
  }

  const getNextPosts = () => {
    axios.post('https://akademia108.pl/api/social-app/post/older-then', {
      date: posts[posts.length - 1].created_at
    })
      .then(res => {
        setPosts([...posts, ...res.data])
        // setPosts(posts.concat(res.data))
        console.log("Pobieranie danych older-then", res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getLatestPosts();
  }, [])

  return (
    <section className='Home'>
      {props.user && (
        <AddPost />
      )}
      <div className='postList'>
        {posts.map((post) => {
          return (
            <Post post={post} key={post.id} />
          )
        })}
      </div>
      <button onClick={getNextPosts} type="button" className="button">Load more</button>
    </section>
  )
}

export default Home
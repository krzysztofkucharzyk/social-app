import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Home.css'
import Post from '../components/Post';

const Home = () => {

  const [posts, setPosts] = useState([]);

  const getLatestPosts = () => {
    Axios.post('https://akademia108.pl/api/social-app/post/latest')
      .then(res => {
        console.log("Pobieranie danych", res.data)
        setPosts(res.data)
      })
      .catch(error => console.log(error))
  }

  const getNextPost = async () => {
    Axios.post('https://akademia108.pl/api/social-app/post/older-then')
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  useEffect(() => {
    getLatestPosts();
    getNextPost();
  }, [])

  return (
    <section className='Home'>
      <div className='postList'>
        {posts.map((post) => {
          return (
            <Post post={post} key={post.id}/>
          )
        })}
      </div>
    </section>
  )
}

export default Home
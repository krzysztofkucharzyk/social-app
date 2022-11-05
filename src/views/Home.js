import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Home.css'
import Post from '../components/Post';
// import { FiHeart } from 'react-icons/fi';

const Home = () => {

  const [posts, setPosts] = useState([]);

  const getLatestPosts = () => {
    Axios.post('http://akademia108.pl/api/social-app/post/latest')
      .then(res => {
        console.log("Pobieranie danych", res.data)
        setPosts(res.data)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getLatestPosts();
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
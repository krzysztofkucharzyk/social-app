import React, { useEffect, useState } from 'react'
import Axios from 'axios'

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

  const getDate = (date) => {
    return date.split(' ')[0]
  }

  return (
    <section className='Home'>
      <h2>Home</h2>

      <div className='postList'>
        {posts.map((post) => (
          <div key={post.id}>
            <div><img src={post.user.avatar_url} alt='avatar' /></div>
            <div>{post.user.username}</div>
            <div>{getDate(post.created_at)}</div>
            <div>{post.content}</div>
            <div>{post.likes.length}</div>
          </div>
        ))}
      </div>





    </section>
  )
}

export default Home
import { useContext, useEffect, useState } from 'react';
import styles from './Home.module.scss';
import axios from 'axios';
import { AuthContext } from '../../app/AuthContextProvider/AuthContextProvider';
import PostItem, { Post } from '../../app/PostItem/PostItem';

/* eslint-disable-next-line */
export interface HomeProps {}

export interface User {
  id: number
  usergrp: number | null
  sectionId: number | null
  rank: string
  name: string
  email: string
  address1: string
  address2: string | null
  city: string
  state: string
  postal: number
  phone: number
  passReset: number
  ftStaff: number
  lastActivity: Date | null
  createdAt: Date | null
  updatedAt: Date | null
}

export function Home(props: HomeProps) {
  // const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const authContext = useContext(AuthContext);

  function getPosts() {
    axios.get<Post[]>('http://localhost:4310/api/posts', {
      headers: {
        Accept: 'application/json',
        Authorization: ` Bearer ${authContext.token}`
      }
    }).then((response) => {
      const {data} = response;
      setPosts(data ?? []);
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styles['container']}>
      {posts ? posts.map((post) => 
        <PostItem key={post.id} post={post} reloadPosts={getPosts}></PostItem>
      ) : <></>}
    </div>
  );
}

export default Home;

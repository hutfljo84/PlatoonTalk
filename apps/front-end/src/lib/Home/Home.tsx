import { useContext, useEffect, useState } from 'react';
import styles from './Home.module.scss';
import axios from 'axios';
import { AuthContext } from '../../app/AuthContextProvider/AuthContextProvider';
import PostItem, { Post } from '../../app/PostItem/PostItem';
import { Button } from '@mui/material';

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
  // add role to authContext
  // TODO grab from keycloak
  const [admin, setAdmin] = useState(true);
  const [newPost, setNewPost] = useState(false);

  function getPosts() {
    axios.get<Post[]>('http://localhost:4310/api/posts', {
      headers: {
        Accept: 'application/json',
        Authorization: ` Bearer ${authContext.token}`
      }
    }).then((response) => {
      const {data} = response;
      setPosts(data ?? []);
      setNewPost(false);
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={styles['container']}>
      {admin ?
      <div style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap'}}>
        {newPost ? <Button onClick={() => setNewPost(false)}>cancel</Button>: <Button onClick={() => setNewPost(true)}>Add Post</Button>}
        {newPost ? <PostItem post={undefined} reloadPosts={getPosts}/> : <></>}
      </div> :
      <></>
      }
      {posts ? posts.map((post) => 
        <PostItem key={post.id} post={post} reloadPosts={getPosts}></PostItem>
      ) : <></>}
    </div>
  );
}

export default Home;

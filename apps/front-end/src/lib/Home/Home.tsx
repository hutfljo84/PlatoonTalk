import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import axios from 'axios';

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
  const [users, setUsers] = useState<User[]>([]);

  // TODO blocked by CORS, setup proxy to stop this
  useEffect(() => {
    axios.get<{data: User[]}>('http://localhost:4310/api/user', {
      headers: {
        Accept: 'application/json'
      }
    }).then((response) => {
      setUsers(response.data.data);
      console.log(response.data.data ?? 'no data');
    })
  }, []);

  return (
    <div className={styles['container']}>
      {users.map((user) => <div>{user.name}</div>)}
    </div>
  );
}

export default Home;

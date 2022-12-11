// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import NavBar from '../lib/NavBar/NavBar';
import styles from './app.module.scss';
import { AuthContext } from './AuthContextProvider/AuthContextProvider';

export function App() {
  const authContext = useContext(AuthContext);

  return ( 
    authContext.isAuthenticated ?
        <div className={styles['app']}>
          <div className={styles['header']}>
            <NavBar />
          </div>
          <div className={styles['body']}><Outlet /></div>
      </div>
      :
      <h2>Loading login screen...</h2> 
  );
}

export default App;

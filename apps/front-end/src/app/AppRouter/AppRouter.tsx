import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Home from '../../lib/Home/Home';
import LoginPage from '../../lib/LoginPage/LoginPage';
import App from '../app';
import Roster from '../Roster/Roster';

/* eslint-disable-next-line */
export interface AppRouterProps {}

export function AppRouter(props: AppRouterProps) {
// TODO SETUP LOGIC TO CHECK IF NEW USER
// new users are users that have a keycloak account, but don't have account information stored in the DB
// if api/user doesn't return user information, navigate to new-user page.
// new user page will have a form to create db user info
// once created this page will show a waiting screen, until an admin can add a role to their account
const [newUser, setNewUser] = useState(false);

useEffect(() => {
  if (newUser) {
    console.log(newUser)
  }
});

  return (
    <BrowserRouter>
        <Routes>
          {
            newUser ?
          <Route>
            <Route path={'/new-user'} element={<div>new user page</div>}/>
            <Route
                path={''}
                element={<Navigate to={'/new-user'} />}
              />
              <Route
                path={'*'}
                element={<Navigate to={'/new-user'} />}
              />
            </Route>
            :
            <></>
          }
          {
            !newUser ?
          <Route path={'/'} element={<App />}>
            <Route
              path={''}
              element={<Navigate to={'home'} />}
            />
            <Route
              path={'*'}
              element={<Navigate to={'home'} />}
            />
            <Route path={'home'} element={<Home />} />
            <Route path={'files'} element={<div>files</div>} />
            <Route path={'posts'} element={<div>posts</div>}>
              <Route path={':postid'} />
            </Route>
            <Route path={'events'} element={<div>posts</div>}>
              <Route path={':eventid'} />
            </Route>
            <Route path={'roster/:id'} element={<Roster />}>
            </Route>
            <Route path={'profile'} element={<div>profile</div>} />
          </Route>
          :
          <></>
          }
        </Routes>
      </BrowserRouter>
  );
}

export default AppRouter;

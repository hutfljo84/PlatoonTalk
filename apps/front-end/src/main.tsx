import { StrictMode, useState } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useSearchParams,
} from 'react-router-dom';

import { KeycloakClient } from '@react-keycloak/keycloak-ts';
import App from './app/app';
import Home from './lib/Home/Home';
import LoginPage from './lib/LoginPage/LoginPage';
import AuthContextProvider from './app/AuthContextProvider/AuthContextProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<App />}>
            <Route path={'login'} element={<LoginPage />} />
            <Route
              path={''}
              element={<Navigate to={'home?authenticated=true'} />}
            />
            <Route
              path={'*'}
              element={<Navigate to={'home?authenticated=true'} />}
            />
            <Route path={'home'} element={<Home />} />
            <Route path={'files'} element={<div>files</div>} />
            <Route path={'posts'} element={<div>posts</div>}>
              <Route path={':postid'} />
            </Route>
            <Route path={'events'} element={<div>posts</div>}>
              <Route path={':eventid'} />
            </Route>
            <Route path={'roster'} element={<div>roster</div>}>
              <Route path={':group'} element={<div></div>} />
            </Route>
            <Route path={'profile'} element={<div>profile</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
);

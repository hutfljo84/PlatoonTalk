import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Home from '../../lib/Home/Home';
import App from '../app';

/* eslint-disable-next-line */
export interface AppRouterProps {}

export function AppRouter(props: AppRouterProps) {
  return (
    <BrowserRouter>
        <Routes>
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
            <Route path={'roster'} element={<div>roster</div>}>
              <Route path={':group'} element={<div></div>} />
            </Route>
            <Route path={'profile'} element={<div>profile</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default AppRouter;

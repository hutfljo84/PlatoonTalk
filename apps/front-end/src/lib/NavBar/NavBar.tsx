import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Menu, MenuItem } from '@mui/material';
import { display } from '@mui/system';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../app/AuthContextProvider/AuthContextProvider';
import { El } from '../../app/Roster/Roster';
import styles from './NavBar.module.scss';

/* eslint-disable-next-line */
export interface NavBarProps {}

export function NavBar(props: NavBarProps) {
  const authContext = useContext(AuthContext);
  const logout = useContext(AuthContext).logout;
  const [elements, setElements] = useState<El[]>([]);

  useEffect(() => {
    axios
      .get<El[]>('http://localhost:4310/api/element', {
        headers: {
          Accept: 'application/json',
          Authorization: ` Bearer ${authContext.token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        setElements(data ?? []);
      })
      .catch((error) => console.log(error));
  }, [authContext]);

  const [rosterAnchor, setRosterAnchor] = React.useState<null | HTMLElement>(
    null
  );
  const [userAnchor, setUserAnchor] = React.useState<null | HTMLElement>(null);
  const rosterOpen = Boolean(rosterAnchor);
  const userOpen = Boolean(userAnchor);

  const handleClick = (event: React.MouseEvent<HTMLElement>, menu: string) => {
    menu === 'roster'
      ? setRosterAnchor(event.currentTarget)
      : setUserAnchor(event.currentTarget);
  };
  const handleClose = (menu: string) => {
    menu === 'roster' ? setRosterAnchor(null) : setUserAnchor(null);
  };

  return (
    <div className={styles['container']}>
      <div className={styles['link-row']}>
        <Link className={styles['link']} to={`home`}>
          <h3 style={{ fontWeight: 'bold', color: 'black' }}>PlatoonTalk</h3>
        </Link>
        <h3
          onClick={(event) => handleClick(event, 'roster')}
          tabIndex={0}
          className={styles['link-menu']}
        >
          Roster
          <ArrowDropDownIcon />
        </h3>
        <Link className={styles['link']} to={`files`}>
          <h3>Files</h3>
        </Link>
      </div>
      <h3
        tabIndex={0}
        onClick={(event) => handleClick(event, 'user')}
        className={styles['link-menu']}
      >
        {authContext.username ?? 'unknown user'}
        <ArrowDropDownIcon />
      </h3>
      <Menu
        id={'roster-menu'}
        anchorEl={rosterAnchor}
        open={rosterOpen}
        onClose={() => handleClose('roster')}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '15rem',
          }}
        >
          {elements.map((element: El) => (
            <Link
              className={styles['menu-item']}
              to={`roster/${element.id}`}
              onClick={() => handleClose('roster')}
            >
              {element.name}
            </Link>
          ))}
        </div>
      </Menu>

      <Menu
        id={'user-menu'}
        anchorEl={userAnchor}
        open={userOpen}
        onClose={() => handleClose('user')}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '15rem',
          }}
        >
          <Link
            className={styles['menu-item']}
            to={`profile`}
            onClick={() => handleClose('user')}
          >
            Profile
          </Link>
          <Link className={styles['menu-item']} to={'logout'} onClick={logout}>
            Log out
          </Link>
        </div>
      </Menu>
    </div>
  );
}

export default NavBar;

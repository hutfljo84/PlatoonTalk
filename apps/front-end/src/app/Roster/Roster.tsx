import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { User } from '../../lib/Home/Home';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import styles from './Roster.module.scss';

export type El = {
  id: number
  name: string
  createdAt: Date | null
  updatedAt: Date | null
}

export type Section = {
  id: number
  elementid: number | null
  name: string
  createdAt: Date | null
  updatedAt: Date | null
}

/* eslint-disable-next-line */
export interface RosterProps {}

export function Roster(props: RosterProps) {
  const authContext = useContext(AuthContext);
  const { id } = useParams();
  const [element, setElement] = useState<El | undefined>(undefined);
  const [sections, setSections] = useState<Section[] | undefined>(undefined);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  // todo grab

  useEffect(() => {
    if (id && id !== '') {
      axios.get<El>(`http://localhost:4310/api/element/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: ` Bearer ${authContext.token}`
      }
    }).then((response) => {
      const {data} = response;
      setElement(data);
    }).catch(error => console.log(error));
    }
  }, [id, authContext]);

  useEffect(() => {
    if (id && id !== '') {
      axios.get<Section[]>(`http://localhost:4310/api/section/element/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: ` Bearer ${authContext.token}`
      }
    }).then((response) => {
      const {data} = response;
      setSections(data ?? []);
    }).catch(error => console.log(error));
    }
  }, [id, authContext]);

  useEffect(() => {
    if (id && id !== '') {
      axios.get<User[]>(`http://localhost:4310/api/user`, {
      headers: {
        Accept: 'application/json',
        Authorization: ` Bearer ${authContext.token}`
      }
    }).then((response) => {
      const {data} = response;
      setUsers(data ?? []);
    }).catch(error => console.log(error));
    }
  }, [id, authContext]);


  return (
    <div className={styles['container']}>
      <h1>{element?.name}</h1>
      {sections?.map((section) =>
        <div style={{width: '100%'}} key={section.id}>
          <h3 style={{width: '100%', color: 'black', backgroundColor: '#eeeeee'}}>{section.name}</h3>
          <div>
            {
              users?.filter(user => user.sectionId === section.id)
                    .map(user =>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '1rem',
                      height: '2rem',
                      alignItems: 'center',
                      borderBottom: '1px #eeeeee solid'
                    }} key={user.id}>
                      <div>{user.name}</div>
                      <div>{user.email}</div>
                      <div>{user.rank}</div>
                      <div>{`${user.address1} ${user.city} ${user.state} ${user.postal}`}</div>
                      <div>{`# ${user.phone}`}</div>
                    </div>
                  )
            }
          </div>
        </div>
      )
    }
    </div>
  );
}

export default Roster;

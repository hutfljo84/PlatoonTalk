import { useContext, useState } from 'react';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import styles from './PostItem.module.scss';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { TextField } from '@mui/material';
import axios from 'axios';
import { height } from '@mui/system';

export type Post = {
  id: number
  title: string
  content: string
  createdAt: Date | null
  updatedAt: Date | null
}

/* eslint-disable-next-line */
export interface PostItemProps {
  post?: Post;
  reloadPosts: () => void;
}



export function PostItem(props: PostItemProps) {
  // add role to authContext
  const authContext = useContext(AuthContext);
  // TODO grab from keycloak
  const [admin, setAdmin] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.post?.title ?? '');
  const [editedContent, setEditedContent] = useState(props.post?.content ?? '');

  const updateTitle = (event: any) => {
    setEditedTitle(event.target.value);
  }
  const updateContent = (event: any) => {
    setEditedContent(event.target.value);
  }

  if (props.post !== undefined) {
    const postPost = () => {
      axios.put<Post[]>(`http://localhost:4310/api/posts`, {
        id: props.post?.id,
        title: editedTitle,
        content: editedContent,
        createdAt: props.post?.createdAt,
        updatedAt: new Date()
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authContext.token}`
        }
      }).then(() => {
        props.reloadPosts();
        setEditing(false);
        setEditedContent(props.post?.content ?? '');
        setEditedTitle(props.post?.title ?? '');
      }).catch(error => console.log(error));
    }
  
    const deletePost = () => {
      axios.delete<Post[]>(`http://localhost:4310/api/posts/${props.post?.id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authContext.token}`
        }
      }).then(() => {
        props.reloadPosts();
      }).catch(error => console.log(error));
    }
  
    return (
      <div className={styles['container']}>
        <div className={styles['header']}>
           {editing ? <TextField sx={{width: '75%', backgroundColor: 'white'}} value={editedTitle} onChange={updateTitle}></TextField> : <h3>{props.post.title}</h3>}
          { admin ? 
            <div className={styles['button-container']}>
              {!editing ? 
                <div className={styles['button-group']}><IconButton onClick={() => setEditing(true)}><EditIcon /></IconButton><IconButton onClick={deletePost}><DeleteIcon /></IconButton></div> : 
                <div className={styles['button-group']}><IconButton onClick={postPost}><DoneIcon /></IconButton><IconButton onClick={() => setEditing(false)}><ClearIcon /></IconButton></div>}
            </div> : 
            <></>}
        </div>
        <div className={styles['body']}>
          {editing ? <TextField sx={{width: 'calc(100% - 2rem)'}} value={editedContent} onChange={updateContent}></TextField> : <div>{props.post.content}</div>}
        </div>
        <div className={styles['footer']}>{`Last Updated: ${props.post.updatedAt ? props.post.updatedAt?.toString() : 'N/A'}`}</div>
      </div>
    );
  } else {
    const createNewPost = () => {
      axios.post<Post[]>(`http://localhost:4310/api/posts`, {
        id: null,
        title: editedTitle,
        content: editedContent,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${authContext.token}`
        }
      }).then(() => {
        props.reloadPosts();
      }).catch(error => console.log(error));
    }

    return (
      <div className={styles['container']}>
        <div className={styles['header']}>
           <TextField sx={{width: '75%', backgroundColor: 'white'}} value={editedTitle} onChange={updateTitle}></TextField>
            <div className={styles['button-container']}>
                <div className={styles['button-group']}><IconButton onClick={createNewPost}><DoneIcon /></IconButton></div>
            </div>
        </div>
        <div className={styles['body']}>
          <TextField sx={{width: 'calc(100% - 2rem)'}} value={editedContent} onChange={updateContent}></TextField>
        </div>
      </div>
    )
  }
  
}

export default PostItem;

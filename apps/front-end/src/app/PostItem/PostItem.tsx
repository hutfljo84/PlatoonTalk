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

export type Post = {
  id: number
  title: string
  content: string
  createdAt: Date | null
  updatedAt: Date | null
}

/* eslint-disable-next-line */
export interface PostItemProps {
  post: Post;
  reloadPosts: () => void;
}



export function PostItem(props: PostItemProps) {
  // add role to authContext
  const authContext = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.post.title);
  const [editedContent, setEditedContent] = useState(props.post.content);

  const updateTitle = (event: any) => {
    setEditedTitle(event.target.value);
  }
  const updateContent = (event: any) => {
    setEditedContent(event.target.value);
  }

  const postBuilder = (): Post => {
    return {
      id: props.post.id,
      title: editedTitle,
      content: editedContent,
      createdAt: props.post.createdAt,
      updatedAt: new Date()
    }
  }

  const postPost = () => {
    axios.post<Post[]>(`http://localhost:4310/api/posts/${props.post.id}`, postBuilder, {
      headers: {
        Accept: 'application/json',
        Authorization: ` Bearer ${authContext.token}`
      }
    }).then(() => {
      props.reloadPosts();
    }).catch(error => console.log(error));
  }

  const deletePost = () => {
    axios.delete<Post[]>(`http://localhost:4310/api/posts/${props.post.id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: ` Bearer ${authContext.token}`
      }
    }).then(() => {
      props.reloadPosts();
    }).catch(error => console.log(error));
  }

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
         {editing ? <TextField value={editedTitle} onChange={updateTitle}></TextField> : <h1>{props.post.title}</h1>}
        { admin ? 
          <div className={styles['button-container']}>
            {editing ? 
              <div className={styles['button-group']}><IconButton onClick={() => setEditing(true)}><EditIcon /></IconButton><IconButton onClick={deletePost}><DeleteIcon /></IconButton></div> : 
              <div className={styles['button-group']}><IconButton onClick={postPost}><DoneIcon /></IconButton><IconButton onClick={() => setEditing(false)}><ClearIcon /></IconButton></div>}
          </div> : 
          <></>}
      </div>
      <div className={styles['body']}>
        {editing ? <TextField value={editedContent} onChange={updateContent}></TextField> : <div>{props.post.content}</div>}
      </div>
      <div className={styles['footer']}>{`Last Updated: ${props.post.updatedAt ? props.post.updatedAt?.toDateString() : 'N/A'}`}</div>
    </div>
  );
}

export default PostItem;

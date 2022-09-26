import React from 'react';
import { useDispatch } from 'react-redux';

import { updateLikesFor } from '../reducers/blogsReducer';
import { appendComment } from '../reducers/blogsReducer';

import useField from '../hooks/useField';

const BlogView = ({ blog }) => {
  const comment = useField('text');

  const dispatch = useDispatch();

  const incrementLikes = (blog) => {
    dispatch(updateLikesFor(blog));
  };

  const addComment = (event) => {
    event.preventDefault();
    dispatch(appendComment(blog.id, comment.fields.value));
    comment.reset();
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={`${blog.url}`}>{blog.url}</a>
      <p>
        likes {blog.likes}{' '}
        <button onClick={() => incrementLikes(blog)} id='likeBtn'>
          like
        </button>
      </p>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input {...comment.fields}></input>
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => {
          return <li key={comment}>{comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default BlogView;

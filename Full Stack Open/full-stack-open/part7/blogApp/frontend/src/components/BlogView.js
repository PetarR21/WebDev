import React from 'react';
import { useDispatch } from 'react-redux';

import { updateLikesFor } from '../reducers/blogsReducer';
import { removeBlog } from '../reducers/blogsReducer';

const BlogView = ({ blog }) => {
  const dispatch = useDispatch();

  const incrementLikes = (blog) => {
    dispatch(updateLikesFor(blog));
  };

  const removeBlogFor = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog));
    }
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
      <p>{blog.user.name}</p>
    </div>
  );
};

export default BlogView;

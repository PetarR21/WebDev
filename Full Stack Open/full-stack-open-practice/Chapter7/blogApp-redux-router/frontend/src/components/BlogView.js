import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { initializeBlogs } from '../reducers/blog';
import { likeBlog } from '../reducers/blog';

const BlogView = () => {
  const id = useParams().id;
  const blog = useSelector((state) => {
    return state.blogs.find((blog) => blog.id === id);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  if (!blog) {
    return null;
  }

  const like = () => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }));
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes} <button onClick={like}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  );
};

export default BlogView;

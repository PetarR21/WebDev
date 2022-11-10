import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useField } from '../hooks';
import { commentOnBlog, initializeBlogs } from '../reducers/blog';
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

  const comment = useField('text', 'comment');

  if (!blog) {
    return null;
  }

  const like = () => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }));
  };

  const addComment = () => {
    if (comment.fields.value.trim() !== '') {
      dispatch(commentOnBlog(blog, comment.fields.value));
    }
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
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={addComment}>
        <input {...comment.fields} />
        <button type='submit'>add comment</button>
      </form>
    </div>
  );
};

export default BlogView;

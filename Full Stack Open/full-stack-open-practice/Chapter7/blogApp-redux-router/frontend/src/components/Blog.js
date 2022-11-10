import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog } from '../reducers/blog';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const like = () => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1 }));
  };

  const showWhenVisible = { display: visible ? 'block' : 'none' };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={like}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );
};

export default Blog;

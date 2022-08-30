import { useState } from 'react';

const Blog = ({ blog, incrementLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };
  return (
    <div style={blogStyle} className='blog'>
      <div className='showByDefault'>
        {blog.title} {blog.author}{' '}
      </div>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
        id='viewBtn'
      >
        {visible ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible} className='hideByDefault'>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{' '}
          <button onClick={() => incrementLikes(blog)} id='likeBtn'>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        <button id='removeBtn' onClick={() => removeBlog(blog)}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;

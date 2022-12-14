import { useState, useEffect, useRef } from 'react';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserJSON');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (credidentials) => {
    try {
      const user = await loginService.login(credidentials);
      setUser(user);

      blogService.setToken(user.token);
      window.localStorage.setItem('loggedUserJSON', JSON.stringify(user));
    } catch (error) {
      showNotification({ message: 'wrong username or password', type: 'error' });
    }
  };

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  };

  const addBlog = async (blogObject) => {
    try {
      const savedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(savedBlog));
      showNotification({ message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`, type: 'success' });
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      showNotification({ message: error.response.data.error, type: 'error' });
    }
  };

  const blogFormRef = useRef();

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUserJSON');
  };

  const showNotification = (object) => {
    setNotification(object);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const incrementLikesFor = async (blog) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog.id, { likes: blog.likes + 1 });
      setBlogs([...blogs].map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
      showNotification({ message: `Successfully liked ${blog.title} by ${blog.author}`, type: 'success' });
    } catch (error) {
      showNotification({ message: error.response.data.error, type: 'error' });
    }
  };

  const sortedBlogs = [...blogs].sort((a, b) => {
    return b.likes - a.likes;
  });

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.removeBlog(blog.id);
        setBlogs([...blogs].filter((b) => b.id !== blog.id));
        showNotification({ message: `Successfully removed ${blog.title} by ${blog.author}`, type: 'success' });
      } catch (error) {
        showNotification({ message: error.response.data.error, type: 'error' });
      }
    }
  };

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
          {blogForm()}
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={() => {
                incrementLikesFor(blog);
              }}
              removeBlog={removeBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

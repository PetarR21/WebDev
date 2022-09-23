import { useState, useEffect, useRef } from 'react';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogsForm from './components/BlogsForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotification({
        message: `wrong username or password`,
        type: 'error',
      });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
  };

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject);

    blogFormRef.current.toggleVisibility();
    setBlogs(blogs.concat(returnedBlog));
    console.log(returnedBlog);
    setNotification({
      message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      type: 'success',
    });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const blogFormRef = useRef();

  const incrementLikes = async (blog) => {
    const updatedBlog = await blogService.update(blog.id, {
      likes: blog.likes + 1,
    });

    setBlogs(blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)));
  };

  const removeBlog = async (blogToRemove) => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      try {
        await blogService.removeBlog(blogToRemove.id);
        setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
        setNotification({
          message: `${blogToRemove.title} by ${blogToRemove.author} deleted successfully`,
          type: 'success',
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      } catch (exception) {
        setNotification({
          message: `can not delete blogs from other users`,
          type: 'error',
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      }
    }
  };

  return (
    <div>
      {user === null ? (
        <div>
          <h2>login to application</h2>
          <Notification notification={notification} />
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} loggged in{' '}
            <button
              onClick={() => {
                window.localStorage.removeItem('loggedUser');
                setUser(null);
              }}
            >
              logout
            </button>
          </p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogsForm createBlog={addBlog} />
          </Togglable>
          <Blogs blogs={blogs} incrementLikes={incrementLikes} removeBlog={removeBlog} />
        </div>
      )}
    </div>
  );
};

export default App;

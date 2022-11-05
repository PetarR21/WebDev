import { useState, useEffect } from 'react';

import Blog from './components/Blog';
import Notification from './components/Notification';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername('');
      setPassword('');
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
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              type='text'
              value={username}
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
          </div>
          <div>
            password{' '}
            <input
              type='password'
              value={password}
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    );
  };

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title,
      author,
      url,
    };

    try {
      const savedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(savedBlog));
      setTitle('');
      setAuthor('');
      setPassword('');
      showNotification({ message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`, type: 'success' });
    } catch (error) {
      showNotification({ message: error.response.data.error, type: 'error' });
    }
  };

  const blogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              type='text'
              value={title}
              onChange={({ target }) => {
                setTitle(target.value);
              }}
            />
          </div>
          <div>
            author:
            <input
              type='text'
              value={author}
              onChange={({ target }) => {
                setAuthor(target.value);
              }}
            />
          </div>
          <div>
            url:
            <input
              type='text'
              value={url}
              onChange={({ target }) => {
                setUrl(target.value);
              }}
            />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
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
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;

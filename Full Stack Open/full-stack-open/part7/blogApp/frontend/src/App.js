import { useState, useEffect, useRef } from 'react';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogsForm from './components/BlogsForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);

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

  return (
    <div>
      {user === null ? (
        <div>
          <h2>login to application</h2>
          <Notification />
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
          <Notification />
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

          <BlogsForm />

          <Blogs />
        </div>
      )}
    </div>
  );
};

export default App;

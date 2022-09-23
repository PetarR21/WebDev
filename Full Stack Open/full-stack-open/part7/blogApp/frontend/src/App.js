import { useState, useEffect, useRef } from 'react';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import BlogsForm from './components/BlogsForm';
import Notification from './components/Notification';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from './reducers/userReducer';

import blogService from './services/blogs';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {user === null ? (
        <div>
          <h2>login to application</h2>
          <Notification />
          <LoginForm />
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
                dispatch(setUser(null));
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

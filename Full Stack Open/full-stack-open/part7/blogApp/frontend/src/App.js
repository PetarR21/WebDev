import { useEffect } from 'react';

import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import LoggedUser from './components/LoggedUser';
import BlogsView from './components/BlogsView';
import UsersView from './components/UsersView';
import User from './components/User';

import { Routes, Route, Link, useMatch } from 'react-router-dom';

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
          <LoggedUser />
          <Routes>
            <Route path='/' element={<BlogsView />} />
            <Route path='/users/*' element={<UsersView />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomeView from './components/HomeView';
import LoginForm from './components/LoginForm';
import LoggedUser from './components/LoggedUser';
import Notification from './components/Notification';
import User from './components/User';
import BlogView from './components/BlogView';

import { Routes, Route, Link } from 'react-router-dom';

import { logInUser } from './reducers/user';

import userService from './services/user';
import Users from './components/Users';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const paddingRight = { paddingRight: 10 };

  useEffect(() => {
    const loggedUser = userService.getUser();
    dispatch(logInUser(loggedUser));
  }, []);

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <div style={{ background: 'gray', padding: 8 }}>
            <Link style={paddingRight} to='/'>
              blogs
            </Link>
            <Link style={paddingRight} to='/users'>
              users
            </Link>
            <LoggedUser user={user} />
          </div>

          <h1>blog app</h1>
          <Notification />

          <Routes>
            <Route path='/' element={<HomeView blogFormRef={blogFormRef} />} />
            <Route path='/blogs/:id' element={<BlogView />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;

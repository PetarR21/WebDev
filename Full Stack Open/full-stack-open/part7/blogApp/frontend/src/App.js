import { useEffect } from 'react';

import Notification from './components/Notification';
import HomeView from './components/HomeView';
import UsersView from './components/UsersView';
import LoginView from './components/LoginView';
import Menu from './components/Menu';

import { Routes, Route } from 'react-router-dom';

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
      <Menu user={user} />
      <Notification />
      <h1>blog app</h1>
      <Routes>
        <Route path='/*' element={user === null ? <LoginView /> : <HomeView />} />
        <Route path='/users/*' element={user === null ? <LoginView /> : <UsersView />} />
      </Routes>
    </div>
  );
};

export default App;

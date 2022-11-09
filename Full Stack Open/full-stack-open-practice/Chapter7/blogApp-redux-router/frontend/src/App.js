import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import LoggedUser from './components/LoggedUser';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

import { logInUser } from './reducers/user';

import userService from './services/user';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

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
          <h1>blogs</h1>
          <Notification />
          <LoggedUser user={user} />
          <Togglable buttonLabel={'create new'} ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;

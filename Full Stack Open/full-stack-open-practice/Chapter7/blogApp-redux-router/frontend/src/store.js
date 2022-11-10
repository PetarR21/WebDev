import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import blogReducer from './reducers/blog';
import notificationReducer from './reducers/notification';
import usersReducer from './reducers/users';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
});

export default store;

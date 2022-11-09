import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import blogReducer from './reducers/blog';
import notificationReducer from './reducers/notification';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;

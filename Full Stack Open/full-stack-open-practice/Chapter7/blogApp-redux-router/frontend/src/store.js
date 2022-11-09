import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import blogReducer from './reducers/blog';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
  },
});

export default store;

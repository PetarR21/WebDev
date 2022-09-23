import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
  },
});

export default store;

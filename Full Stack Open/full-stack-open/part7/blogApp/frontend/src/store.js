import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogsReducer';

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
  },
});

export default store;

import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blog';
import { showNotification } from './notification';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { setBlogs, appendBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (object, blogFormRef, reset) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.createNew(object);
      dispatch(appendBlog(savedBlog));
      dispatch(
        showNotification({ message: `Added blog '${savedBlog.title}' by ${savedBlog.author}`, type: 'success' }, 5)
      );
      blogFormRef.current.toggleVisibility();
      reset();
    } catch (error) {
      dispatch(showNotification({ message: error.response.data.error, type: 'error' }, 5));
    }
  };
};

export default blogSlice.reducer;

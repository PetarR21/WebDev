import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blog';

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

export const createBlog = (object) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.createNew(object);
      dispatch(appendBlog(savedBlog));
    } catch (error) {
      throw new Error('error');
    }
  };
};

export default blogSlice.reducer;

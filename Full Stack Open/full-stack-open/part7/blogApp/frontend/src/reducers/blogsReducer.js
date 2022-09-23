import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';

const blogsSlice = createSlice({
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

export const { setBlogs } = blogsSlice.actions;

export const initialzeBlogs = () => {
  return async (disptach) => {
    const blogs = await blogsService.getAll();
    disptach(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const createdBlog = await blogsService.create(blogObject);
    dispatch(appendBlog(createBlog));
  };
};

export default blogsSlice.reducer;

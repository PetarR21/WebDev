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
    update(state, action) {
      return state.map((blog) => (blog.id === action.payload.id ? action.payload : blog));
    },
  },
});

export const { setBlogs, appendBlog, update } = blogSlice.actions;

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

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog.id, { likes: blog.likes });
      dispatch(update(updatedBlog));
      dispatch(showNotification({ message: `Successfully liked blog '${updatedBlog.title}'`, type: 'success' }, 5));
    } catch (error) {
      dispatch(showNotification({ message: error.response.data.error, type: 'error' }, 5));
    }
  };
};

export default blogSlice.reducer;

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
    removeOne(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
  },
});

export const { setBlogs, appendBlog, update, removeOne } = blogSlice.actions;

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

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog.id);
      dispatch(removeOne(blog));
      dispatch(showNotification({ message: `Successfully deleted blog '${blog.title}'`, type: 'success' }, 5));
    } catch (error) {
      dispatch(showNotification({ message: error.response.data.error, type: 'error' }, 5));
    }
  };
};

export const commentOnBlog = (blog, comment) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.addComment(blog.id, { comment });
      dispatch(update(savedBlog));
      dispatch(showNotification({ message: `Successfully commented on blog '${blog.title}'`, type: 'success' }, 5));
    } catch (error) {
      dispatch(showNotification({ message: error.response.data.error, type: 'error' }, 5));
    }
  };
};

export default blogSlice.reducer;

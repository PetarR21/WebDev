import { createSlice } from '@reduxjs/toolkit';
import BlogView from '../components/BlogView';
import blogsService from '../services/blogs';
import { setNotificationFor } from './notificationReducer';

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
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog));
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, updateBlog, appendBlog, deleteBlog } = blogsSlice.actions;

export const initialzeBlogs = () => {
  return async (disptach) => {
    const blogs = await blogsService.getAll();
    disptach(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogsService.create(blogObject);
      dispatch(appendBlog(createdBlog));
      dispatch(
        setNotificationFor(
          { message: `successfully created blog ${createdBlog.title} by ${createdBlog.author}`, type: 'success' },
          5
        )
      );
    } catch (error) {}
  };
};

export const updateLikesFor = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsService.update(blog.id, { likes: blog.likes + 1 });
      dispatch(updateBlog(updatedBlog));
      dispatch(
        setNotificationFor({ message: `successfully liked blog ${blog.title} by ${blog.author}`, type: 'success' }, 5)
      );
    } catch (error) {
      console.log(error);
      dispatch(setNotificationFor({ message: error.response.data.error, type: 'error' }, 5));
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogsService.removeBlog(blog.id);
      dispatch(deleteBlog(blog.id));
      dispatch(
        setNotificationFor({ message: `successfully deleted blog ${blog.title} by ${blog.author}`, type: 'success' }, 5)
      );
    } catch (error) {
      dispatch(setNotificationFor({ message: error.response.data.error, type: 'error' }, 5));
    }
  };
};

export const appendComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogsService.updateComments(id, comment);
      dispatch(updateBlog(updatedBlog));
      dispatch(
        setNotificationFor(
          { message: `successfully commented on blog ${updatedBlog.title} by ${updatedBlog.author}`, type: 'success' },
          5
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(setNotificationFor({ message: error.response.data.error, type: 'error' }, 5));
    }
  };
};

export default blogsSlice.reducer;

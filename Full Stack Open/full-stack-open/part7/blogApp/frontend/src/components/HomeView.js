import React from 'react';
import BlogsView from './BlogsView';
import BlogView from './BlogView';
import { Routes, Route, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { initialzeBlogs } from '../reducers/blogsReducer';
import { useEffect } from 'react';

const HomeView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialzeBlogs());
  }, []);

  const blogs = useSelector((state) => state.blogs);
  const match = useMatch('/blogs/:id');
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

  return (
    <div className='container mx-auto p-6 '>
      <h2 className='text-4xl'>List of blogs</h2>
      <Routes>
        <Route path='/' element={<BlogsView />} />
        <Route path='/blogs/:id' element={<BlogView blog={blog} />} />
      </Routes>
    </div>
  );
};

export default HomeView;

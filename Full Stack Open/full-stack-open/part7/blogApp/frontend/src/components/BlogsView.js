import React from 'react';
import BlogsForm from './BlogsForm';
import Blogs from './Blogs';

const BlogsView = () => {
  return (
    <div>
      <h2 className='text-4xl font-semibold text-blue-800'>List of blogs</h2>
      <BlogsForm />
      <Blogs />
    </div>
  );
};

export default BlogsView;

import React from 'react';
import BlogsForm from './BlogsForm';
import Blogs from './Blogs';

const BlogsView = () => {
  return (
    <div>
      <h2 className='text-4xl'>List of blogs</h2>
      <BlogsForm />
      <Blogs />
    </div>
  );
};

export default BlogsView;

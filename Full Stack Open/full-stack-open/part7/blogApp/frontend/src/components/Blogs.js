import Blog from './Blog';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialzeBlogs } from '../reducers/blogsReducer';

const Blogs = ({ incrementLikes, removeBlog }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialzeBlogs());
  }, []);

  const sortedBlogs = [...blogs].sort((blog1, blog2) => {
    return blog2.likes - blog1.likes;
  });

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} incrementLikes={incrementLikes} removeBlog={removeBlog} />
      ))}
    </div>
  );
};

export default Blogs;

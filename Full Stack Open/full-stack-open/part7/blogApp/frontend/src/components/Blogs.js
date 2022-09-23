import Blog from './Blog';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialzeBlogs } from '../reducers/blogsReducer';
import { updateLikesFor } from '../reducers/blogsReducer';
import { removeBlog } from '../reducers/blogsReducer';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialzeBlogs());
  }, []);

  const incrementLikes = (blog) => {
    dispatch(updateLikesFor(blog));
  };

  const removeBlogFor = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog));
      
    }
  };

  const sortedBlogs = [...blogs].sort((blog1, blog2) => {
    return blog2.likes - blog1.likes;
  });

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          incrementLikes={() => {
            incrementLikes(blog);
          }}
          removeBlog={() => {
            removeBlogFor(blog);
          }}
        />
      ))}
    </div>
  );
};

export default Blogs;

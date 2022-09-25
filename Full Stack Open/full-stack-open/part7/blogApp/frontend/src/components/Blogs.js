import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialzeBlogs } from '../reducers/blogsReducer';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

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
      {sortedBlogs.map((blog) => {
        return (
          <div key={blog.id} style={blogStyle} className='blog'>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;

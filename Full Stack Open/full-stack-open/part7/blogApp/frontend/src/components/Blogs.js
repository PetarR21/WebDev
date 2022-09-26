import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialzeBlogs } from '../reducers/blogsReducer';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialzeBlogs());
  }, []);

  const sortedBlogs = [...blogs].sort((blog1, blog2) => {
    return blog2.likes - blog1.likes;
  });

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-7'>
      {sortedBlogs.map((blog) => {
        return (
          <div
            key={blog.id}
            className='p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between gap-5'
          >
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-700 '>
              {blog.title} by {blog.author}
            </h5>
            <div>
              <Link
                to={`/blogs/${blog.id}`}
                className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800'
              >
                Read more
                <svg
                  aria-hidden='true'
                  className='ml-2 -mr-1 w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;

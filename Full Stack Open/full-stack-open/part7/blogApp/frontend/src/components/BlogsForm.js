import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import useField from '../hooks/useField';
import Togglable from './Togglable';

const BlogsForm = () => {
  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const dispatch = useDispatch();

  const togglableRef = useRef();

  const addBlog = (event) => {
    event.preventDefault();

    dispatch(createBlog({ title: title.fields.value, author: author.fields.value, url: url.fields.value }));
    title.reset();
    author.reset();
    url.reset();
    togglableRef.current.toggleVisibility();
  };

  return (
    <Togglable buttonLabel='new blog' ref={togglableRef}>
      <form onSubmit={addBlog} className='formDiv flex flex-col gap-5'>
        <div>
          <label htmlFor='title' className='block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-300'>
            Title
          </label>
          <input
            id='title'
            className='titleInput bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            {...title.fields}
          />
        </div>
        <div>
          <label htmlFor='author' className='block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-300'>
            Author
          </label>
          <input
            id='author'
            className='titleInput bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            {...author.fields}
          />
        </div>
        <div>
          <label htmlFor='url' className ='block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-300'>
            URL
          </label>
          <input
            id='url'
            className='titleInput bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            {...url.fields}
          />
        </div>
        <div>
          <button
            id='createBtn'
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            create
          </button>
        </div>
      </form>
    </Togglable>
  );
};

export default BlogsForm;

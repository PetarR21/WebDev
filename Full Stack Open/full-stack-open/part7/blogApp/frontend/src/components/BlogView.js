import React from 'react';
import { useDispatch } from 'react-redux';

import { updateLikesFor } from '../reducers/blogsReducer';
import { appendComment } from '../reducers/blogsReducer';

import useField from '../hooks/useField';

const BlogView = ({ blog }) => {
  if (!blog) {
    return null;
  }

  const comment = useField('text');

  const dispatch = useDispatch();

  const incrementLikes = (blog) => {
    dispatch(updateLikesFor(blog));
  };

  const addComment = (event) => {
    event.preventDefault();
    dispatch(appendComment(blog.id, comment.fields.value));
    comment.reset();
  };

  return (
    <div className='flex flex-col gap-9 text-2xl'>
      <h2 className='text-4xl font-semibold text-darkBlue'>{blog.title}</h2>
      <a className='underline' href={`${blog.url}`}>
        {blog.url}
      </a>
      <div className='flex gap-1'>
        likes:{'    '}
        <span className='font-bold '>{blog.likes}</span>
        <button onClick={() => incrementLikes(blog)} id='likeBtn'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-6 h-6 text-brightRed hover:text-darkBlue ml-2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z'
            />
          </svg>
        </button>
      </div>
      <p>
        added by <span className='italic text-darkBlue font-semibold'>{blog.user.name}</span>
      </p>
      <h3 className='text-3xl'>Comments</h3>
      <form onSubmit={addComment} className='flex gap-4 w-[70%]'>
        <input
          {...comment.fields}
          className='titleInput bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        ></input>
        <button
          type='submit'
          className='ml-2 px-10 py-3 rounded-full  text-white bg-brightRed rounded-lg hover:bg-brightRedLight'
        >
          add
        </button>
      </form>
      <ul className='space-y-3 my-7 max-w-[70%] list-disc list-inside text-darkBlue dark:text-gray-400'>
        {blog.comments.map((comment) => {
          return <li key={comment}>{comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default BlogView;

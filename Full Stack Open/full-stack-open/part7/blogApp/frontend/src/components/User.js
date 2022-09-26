import React from 'react';

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className='flex flex-col gap-10'>
      <h2 className='text-4xl font-semibold text-darkBlue'>{user.name}</h2>
      <div>
        <h3 className='text-3xl font-semibold text-brightRed'>added blogs</h3>
        <ul className='space-y-3 my-7 max-w-[70%] list-disc list-inside text-darkBlue dark:text-gray-400'>
          {user.blogs.map((blog, index) => (
            <li key={blog.id} className={`text-2xl font-semibold text-${index % 2 === 0 ? 'darkBlue' : 'brightRed'}`}>
              {blog.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;

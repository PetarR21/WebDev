import React from 'react';
import { Link } from 'react-router-dom';
import LoggedUser from './LoggedUser';

const Menu = ({ user }) => {
  return (
    <nav className='relative container mx-auto p-6'>
      <div className='flex items-center justify-between min-h-[100px]'>
        <div className='flex items-center h-full'>
          <h1 className='text-5xl font-bold text-gray-600'>blogApp</h1>
        </div>
        <div className='hidden lg:flex space-x-8'>
          <Link to='/' className='hover:text-darkGrayishBlue text-2xl flex items-center'>
            <span>Blogs</span>
          </Link>
          <Link to='/users' className='hover:text-darkGrayishBlue text-2xl flex items-center'>
            <span className=' '>Users</span>
          </Link>
          {user === null ? (
            <button className='ml-2 px-6 py-2 text-white bg-brightRed rounded-full hover:bg-brightRedLight'>
              <Link className='text-xl'>log in</Link>
            </button>
          ) : (
            <LoggedUser user={user} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Menu;

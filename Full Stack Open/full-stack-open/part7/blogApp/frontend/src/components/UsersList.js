import React from 'react';
import { Link } from 'react-router-dom';

const UsersList = ({ users }) => {
  return (
    <div className='container mx-auto my-10'>
      <table className='w-full text-4xl text-left text-gray-500 dark:text-gray-400'>
        <thead className=' text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th className='py-3 px-6'>Users</th>
            <th className='py-3 px-6'>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              <td className='py-4 px-6'>
                <Link className='hover:text-brightRed' to={`/users/${user.id}`}>
                  {user.name}
                </Link>
              </td>
              <td className='py-4 px-6'>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;

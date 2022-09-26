import React, { useEffect, useState } from 'react';
import usersService from '../services/users';
import { Link, Route, Routes, useMatch } from 'react-router-dom';
import UsersList from './UsersList';
import User from './User';

const UsersView = () => {
  const [users, setUsers] = useState([]);
  const match = useMatch('/users/:id');
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await usersService.getAll();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  return (
    <div className='container mx-auto p-6 mt-12'>
      <Routes>
        <Route path='/' element={<UsersList users={users} />} />
        <Route path='/:id' element={<User user={user} />} />
      </Routes>
    </div>
  );
};

export default UsersView;

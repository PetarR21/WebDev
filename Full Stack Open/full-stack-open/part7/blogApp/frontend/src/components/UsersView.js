import React, { useEffect, useState } from 'react';
import usersService from '../services/users';
import { Link, Route, Routes, useMatch } from 'react-router-dom';
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
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Routes>
        <Route path='/:id' element={<User user={user} />} />
      </Routes>
    </div>
  );
};

export default UsersView;

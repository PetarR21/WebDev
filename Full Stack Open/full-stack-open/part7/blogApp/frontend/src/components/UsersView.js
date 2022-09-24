import React, { useEffect, useState } from 'react';
import usersService from '../services/users';

const UsersView = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const users = await usersService.getAll();
    setUsers(users);
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th>&nbsp;</th>
          <th>blogs created</th>
        </tr>
        {users.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default UsersView;

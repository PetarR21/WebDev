import React from 'react';
import { Link } from 'react-router-dom';
import LoggedUser from './LoggedUser';

const Menu = ({ user }) => {
  const padding = {
    paddingRight: 10,
  };

  return (
    <div>
      <Link to='/' style={padding}>
        blogs
      </Link>
      <Link to='/users' style={padding}>
        users
      </Link>
      {user === null ? '' : <LoggedUser user={user} />}
    </div>
  );
};

export default Menu;

import userService from '../services/user';
import { logOutUser } from '../reducers/user';
import { useDispatch } from 'react-redux';

const LoggedUser = ({ user }) => {
  const dispatch = useDispatch();

  const logout = () => {
    userService.l
  };

  return (
    <h3>
      {user.name} logged in <button onClick={logout}>log out</button>
    </h3>
  );
};

export default LoggedUser;

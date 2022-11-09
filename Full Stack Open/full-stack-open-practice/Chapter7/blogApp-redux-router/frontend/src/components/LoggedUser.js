import userService from '../services/user';
import { logOutUser } from '../reducers/user';
import { useDispatch } from 'react-redux';

const LoggedUser = ({ user }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logOutUser());
    userService.clearUser();
  };

  return (
    <div>
      {user.name} logged in <button onClick={logout}>log out</button>
    </div>
  );
};

export default LoggedUser;

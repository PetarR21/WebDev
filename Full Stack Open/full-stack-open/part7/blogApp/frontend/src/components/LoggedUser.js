import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../reducers/userReducer';

const LoggedUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <div>
      <div>{user.name} loggged in </div>
      <button
        style={{ display: 'block' }}
        onClick={() => {
          window.localStorage.removeItem('loggedUser');
          dispatch(setUser(null));
        }}
      >
        logout
      </button>
    </div>
  );
};

export default LoggedUser;

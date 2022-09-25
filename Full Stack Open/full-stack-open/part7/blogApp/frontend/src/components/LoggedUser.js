import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const LoggedUser = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <span>
      {user.name} loggged in
      <button
        style={{ marginLeft: 5 }}
        onClick={() => {
          window.localStorage.removeItem('loggedUser');
          dispatch(setUser(null));
          navigate('/');
        }}
      >
        logout
      </button>
    </span>
  );
};

export default LoggedUser;

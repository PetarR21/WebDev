import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { useNavigate } from 'react-router-dom';

const LoggedUser = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <span className='flex items-center'>
      <span className=' text-2xl text-gray-600 italic'>{user.name} loggged in</span>
      <button
        className='ml-2 px-6 py-2 text-white bg-brightRed rounded-full hover:bg-brightRedLight'
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

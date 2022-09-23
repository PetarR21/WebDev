import useField from '../hooks/useField';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/userReducer';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username.fields.value, password.fields.value));
    
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id='username' {...username.fields} />
        </div>
        <div>
          password
          <input id='password' {...password.fields} />
        </div>
        <button id='loginBtn' type='submit'>
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

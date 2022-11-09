import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { showNotification } from '../reducers/notification';
import { logInUser } from '../reducers/user';
import loginService from '../services/login';
import userService from '../services/user';
import Notification from './Notification';

const LoginForm = () => {
  const username = useField('text', 'username');
  const password = useField('password', 'password');

  const dispatch = useDispatch();

  const reset = () => {
    username.reset();
    password.reset();
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username: username.fields.value, password: password.fields.value });
      userService.setUser(user);
      dispatch(logInUser(user));
    } catch (error) {
      dispatch(showNotification({ message: 'Invalid username or password', type: 'error' }, 5));
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={login}>
        <div>
          <label htmlFor='username'>username</label>
          <input {...username.fields}></input>
        </div>
        <div>
          <label htmlFor='password'>password</label>
          <input {...password.fields}></input>
        </div>
        <button type='submit'>log in</button>
        <button type='button' onClick={reset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

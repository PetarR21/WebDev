import useField from '../hooks/useField';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducers/userReducer';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(loginUser(username.fields.value, password.fields.value));
  };

  return (
    <form onSubmit={handleLogin} className=' flex flex-col gap-7 my-10'>
      <div>
        <label htmlFor='username' className='block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-300'>
          Username
        </label>
        <input
          id='username'
          className='usernameInput bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...username.fields}
        />
      </div>
      <div>
        <label htmlFor='password' className='block mb-2 text-2xl font-medium text-gray-900 dark:text-gray-300'>
          Password
        </label>
        <input
          id='password'
          className='usernameInput bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          {...password.fields}
        />
      </div>
      <div>
        <button
          id='loginBtn'
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-xl w-full sm:w-auto px-12 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

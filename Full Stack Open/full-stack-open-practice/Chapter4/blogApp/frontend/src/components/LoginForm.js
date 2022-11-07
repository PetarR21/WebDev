import { useState } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <form onSubmit={login}>
      <div>
        username{' '}
        <input
          type='text'
          value={username}
          onChange={({ target }) => {
            setUsername(target.value);
          }}
          id='username'
        />
      </div>
      <div>
        password{' '}
        <input
          type='password'
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          id='password'
        />
      </div>
      <button type='submit' id='loginBtn'>
        login
      </button>
    </form>
  );
};

export default LoginForm;

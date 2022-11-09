import React from 'react';
import { useField } from '../hooks';

const LoginForm = () => {
  const username = useField('text', 'username');
  const password = useField('password', 'password');

  const reset = () => {
    username.reset();
    password.reset();
  };

  const login = ()=>{
    
  }

  return (
    <div>
      <h2>Log in to application</h2>
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

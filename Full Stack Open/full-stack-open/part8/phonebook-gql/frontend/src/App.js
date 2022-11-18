import { useApolloClient, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';
import { ALL_PERSONS } from './queries';

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useApolloClient();

  const result = useQuery(ALL_PERSONS);

  useEffect(() => {
    if (localStorage.getItem('phonenumbers-user-token')) {
      setToken(localStorage.getItem('phonenumbers-user-token'));
    }
  }, []);

  if (result.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default App;

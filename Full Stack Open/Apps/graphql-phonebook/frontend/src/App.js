import { useQuery } from '@apollo/client';
import { useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notify from './components/Notify';
import { ALL_PERSONS } from './queries';
import PhoneForm from './components/PhoneForm';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;

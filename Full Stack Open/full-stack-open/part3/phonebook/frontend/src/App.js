import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/person';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(persons.find((person) => person.name === newName));
      }
    } else {
      if (newNumber.trim() === '') {
        alert('Number can not be empty');
        return;
      }

      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setNotification({
            text: `Added ${returnedPerson.name}`,
            type: 'success',
          });
          setTimeout(() => {
            setNotification(null);
          }, 4000);
        })
        .catch((error) => {
          setNotification({
            text: `${error.response.data.error}`,
            type: 'error',
          });
          setTimeout(() => {
            setNotification(null);
          }, 4000);
        });
    }
  };

  const handleDeleteFor = (id) => {
    const person = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({
            text: `Deleted ${person.name}`,
            type: 'success',
          });
          setTimeout(() => {
            setNotification(null);
          }, 4000);
        })
        .catch((error) => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({
            text: `Information of ${person.name} has already been deleted from the server`,
            type: 'error',
          });
          setTimeout(() => {
            setNotification(null);
          }, 4000);
        });
    }
  };

  const updatePerson = (person) => {
    const newPerson = {
      ...person,
      number: newNumber,
    };

    personService
      .update(person.id, newPerson)
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id === updatedPerson.id ? updatedPerson : person
          )
        );
        setNewName('');
        setNewNumber('');
        setNotification({
          text: `Updated ${updatedPerson.name} number to ${updatedPerson.number}`,
          type: 'success',
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      })
      .catch((error) => {
        setNotification({
          text: `${error.response.data.error}`,
          type: 'error',
        });
        setTimeout(() => {
          setNotification(null);
        }, 4000);
      });
  };

  const personsToShow = persons.filter(
    (person) =>
      person.name.trim().toLowerCase().includes(filter.toLowerCase().trim()) ||
      person.number.includes(filter)
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={notification} />

      <Filter filter={filter} setFilter={setFilter} />

      <h3>add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} handleDelete={handleDeleteFor} />
    </div>
  );
};

export default App;

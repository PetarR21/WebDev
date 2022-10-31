import { useState, useEffect } from 'react';
import personService from './services/person';
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((persons) => setPersons(persons));
  }, []);

  const addPerson = async (event) => {
    event.preventDefault();

    if (persons.map((person) => person.name).includes(newName)) {
      updatePerson();
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    try {
      const savedPerson = await personService.create(newPerson);
      setPersons(persons.concat(savedPerson));
      setNewName('');
      setNewNumber('');

      setNotification({ type: 'success', message: `Added ${savedPerson.name}` });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      console.log(error);
      setNotification({ type: 'error', message: error.response.data.error });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const deletePerson = async (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      try {
        await personService.deletePerson(id);
        setPersons(persons.filter((person) => person.id !== personToDelete.id));
        setNotification({ type: 'success', message: `Deleted ${personToDelete.name}` });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } catch (error) {
        setPersons(persons.filter((person) => person.id !== personToDelete.id));
        setNotification({
          type: 'error',
          message: `Information of ${personToDelete.name} has already been removed from server`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    }
  };

  const updatePerson = async () => {
    const personToUpdate = persons.find((person) => person.name === newName);
    if (window.confirm(`${personToUpdate.name} is already added to phonebok, replace the old number with a new one?`)) {
      try {
        const updatedPerson = await personService.updatePerson(personToUpdate.id, {
          number: newNumber,
        });
        setPersons(persons.map((person) => (person.id === updatedPerson.id ? updatedPerson : person)));
        setNewName('');
        setNewNumber('');
        setNotification({
          type: 'success',
          message: `Updated ${updatedPerson.name} number to ${updatedPerson.number}`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } catch (error) {
        console.log(error);
        setNotification({ type: 'error', message: error.response.data.error });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }
    }
  };

  const filteredPersons = [...persons].filter(
    (person) =>
      person.name.trim().toLowerCase().includes(filter.trim().toLowerCase()) ||
      person.number.trim().toLowerCase().includes(filter.trim().toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />

      <h3>add a new</h3>
      <Form
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

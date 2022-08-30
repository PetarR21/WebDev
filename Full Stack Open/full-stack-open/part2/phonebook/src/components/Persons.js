const Persons = ({ personsToShow, handleDelete }) => {
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{' '}
          <button
            onClick={() => {
              handleDelete(person.id);
            }}
          >
            delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;

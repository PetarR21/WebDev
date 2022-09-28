import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import Select from 'react-select';

const BornYearForm = ({ authors }) => {
  const [name, setName] = useState();
  const [number, setNumber] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const updateAuthor = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: name.value, setBornTo: number } });

    setName('');
    setNumber('');
  };

  const options = authors.map((author) => {
    return {
      value: author.name,
      label: author.name,
    };
  });

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <Select value={name} onChange={setName} options={options} />
        <div>
          <label htmlFor='born'>born</label>
          <input
            type='number'
            id='born'
            value={number}
            onChange={({ target }) => setNumber(Number(target.value))}
          ></input>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default BornYearForm;

import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import Select from 'react-select';

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  const [born, setBorn] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const [editAuthor] = useMutation(EDIT_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] });

  if (result.loading) {
    return null;
  }

  if (!props.show) {
    return null;
  }

  const authors = result.data.allAuthors;

  const options = authors.map((a) => {
    return {
      value: a.name,
      label: a.name,
    };
  });

  const update = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: selectedOption.value, setBornTo: Number(born) } });

    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={update}>
          <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options} />
          <div>
            born:{' '}
            <input
              value={born}
              onChange={({ target }) => {
                setBorn(target.value);
              }}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;

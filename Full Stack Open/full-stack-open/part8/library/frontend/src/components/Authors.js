import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import Select from 'react-select';

const Authors = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [born, setBorn] = useState('');

  const result = useQuery(ALL_AUTHORS, {
    skip: !props.show,
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR);

  if (result.loading) {
    return null;
  }

  if (!props.show) {
    return null;
  }
  const authors = result.data.allAuthors;

  const options = authors.map((author) => {
    return {
      value: author.name,
      label: author.name,
    };
  });

  const updateAuthor = (event) => {
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
      <div style={{ display: props.token === null ? 'none' : '' }}>
        <h3>Set birthyear</h3>
        <form>
          <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options} />
          <div>
            born
            <input
              value={born}
              onChange={({ target }) => {
                setBorn(target.value);
              }}
            ></input>
          </div>
          <button onClick={updateAuthor}>update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;

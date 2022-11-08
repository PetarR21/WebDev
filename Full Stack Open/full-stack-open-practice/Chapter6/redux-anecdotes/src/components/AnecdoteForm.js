import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { useState } from 'react';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const [newAnecdote, setNewAnecdote] = useState('');

  const addAnecdote = (event) => {
    event.preventDefault();

    dispatch(createAnecdote(newAnecdote));
    setNewAnecdote('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input
          value={newAnecdote}
          onChange={({ target }) => {
            setNewAnecdote(target.value);
          }}
        />

        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

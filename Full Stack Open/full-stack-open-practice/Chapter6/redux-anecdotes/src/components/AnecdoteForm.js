import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { addNotification } from '../reducers/notificationReducer';
import { useState } from 'react';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const [newAnecdote, setNewAnecdote] = useState('');

  const addAnecdote = async (event) => {
    event.preventDefault();

    dispatch(createAnecdote(newAnecdote));
    setNewAnecdote('');
    dispatch(addNotification(`Added new anecdote '${newAnecdote}'`, 4));
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

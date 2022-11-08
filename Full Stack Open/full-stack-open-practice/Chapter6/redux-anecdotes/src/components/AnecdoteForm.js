import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useState } from 'react';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const [newAnecdote, setNewAnecdote] = useState('');

  const addAnecdote = (event) => {
    event.preventDefault();

    dispatch(createAnecdote(newAnecdote));
    dispatch(setNotification(`Added new anecdote '${newAnecdote}'`));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
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

import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import Anecdotes from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { setAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import anecdotesService from './services/anecdotes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdotesService.getAll().then((anecdotes) => {
      dispatch(setAnecdotes(anecdotes));
    });
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <Anecdotes />
      <AnecdoteForm />
    </div>
  );
};

export default App;

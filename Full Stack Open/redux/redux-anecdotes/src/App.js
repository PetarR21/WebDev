import Anecdotes from './components/Anecdotes';
import NewAnecdote from './components/NewAnecdote';
import Notification from './components/Notification';
import Filter from './components/FIlter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <NewAnecdote />
    </div>
  );
};

export default App;

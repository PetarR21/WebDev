import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { addNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().trim().includes(state.filter.toLowerCase().trim())
    );
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(voteAnecdote(votedAnecdote));

    dispatch(addNotification(`You voted from anecdote '${votedAnecdote.content}'`, 4));
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;

import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`You voted for '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdote.content}
      <br></br>
      has {anecdote.votes}
      <button
        onClick={() => {
          vote(anecdote);
        }}
      >
        vote
      </button>
    </div>
  );
};

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => state.anecdotes);
  const anecdotesByVote = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const filteredAnecdotes = [...anecdotesByVote].filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => {
        return <Anecdote key={anecdote.id} anecdote={anecdote} />;
      })}
    </div>
  );
};

export default AnecdoteList;

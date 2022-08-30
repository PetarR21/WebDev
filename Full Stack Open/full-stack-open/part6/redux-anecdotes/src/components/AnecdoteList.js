import { useDispatch, useSelector } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      {anecdote.content}
      <br></br>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => {
          return (
            <Anecdote
              anecdote={anecdote}
              handleClick={() => dispatch(voteForAnecdote(anecdote.id))}
              key={anecdote.id}
            />
          );
        })}
    </div>
  );
};

export default AnecdoteList;

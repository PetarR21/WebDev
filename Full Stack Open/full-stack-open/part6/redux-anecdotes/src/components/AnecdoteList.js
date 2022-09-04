import { connect } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { setUpNotification } from '../reducers/notificationReducer';

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

const AnecdoteList = (props) => {
  const filter = props.filter;
  const anecdotes = props.anecdotes;
  const anecdotesByVote = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const filteredAnecdotes = [...anecdotesByVote].filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase().trim())
  );

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => {
        return (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              props.voteForAnecdote(anecdote);
              props.setUpNotification(`You voted for '${anecdote.content}'`, 5);
            }}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  voteForAnecdote,
  setUpNotification,
};

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);

export default ConnectedAnecdoteList;

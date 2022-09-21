import { connect } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { setNotificationFor } from '../reducers/notificationReducer';

const Anecdotes = (props) => {
  const anecdotes = props.anecdotes;
  const filter = props.filter;

  const vote = (anecdote) => {
    props.voteForAnecdote(anecdote);
    props.setNotificationFor(`you voted for '${anecdote.content}'`, 5);
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const filteredAnecdotes = [...sortedAnecdotes].filter((a) => a.content.toLowerCase().trim().includes(filter));

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const ConnectedAnecdotes = connect(mapStateToProps, { voteForAnecdote, setNotificationFor })(Anecdotes);
export default ConnectedAnecdotes;

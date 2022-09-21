import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const NewAnecdote = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.createAnecdote(content);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

const ConnectedNewAnecdote = connect(null, { createAnecdote })(NewAnecdote);
export default ConnectedNewAnecdote;

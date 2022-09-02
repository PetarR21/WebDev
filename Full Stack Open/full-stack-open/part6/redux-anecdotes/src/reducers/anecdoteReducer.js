export const createAnnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdote,
  };
};

export const voteForAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id,
    },
  };
};

export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET_ANECDOTES',
    data: {
      anecdotes,
    },
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'VOTE': {
      const id = action.data.id;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote
      );
    }
    case 'SET_ANECDOTES':
      return action.data.anecdotes;
    default:
      return state;
  }
};

export default reducer;

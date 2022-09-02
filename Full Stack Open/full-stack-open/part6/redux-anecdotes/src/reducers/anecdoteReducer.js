import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdote';

const anecdotesSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      return [...state, action.payload];
    },
    async voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        content: anecdoteToVote.content,
        votes: anecdoteToVote.votes + 1,
      };
      const updatedAnecdote = await anecdoteService.update(id, changedAnecdote);
      return state.map((anecdote) =>
        anecdote.id === id ? updatedAnecdote : anecdote
      );
    },
  },
});

export const { setAnecdotes, appendAnecdote, voteAnecdote } =
  anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export default anecdotesSlice.reducer;

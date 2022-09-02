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
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    },
  },
});

export const { setAnecdotes, appendAnecdote, updateAnecdote } =
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

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.update(
      anecdote.id,
      changedAnecdote
    );
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdotesSlice.reducer;

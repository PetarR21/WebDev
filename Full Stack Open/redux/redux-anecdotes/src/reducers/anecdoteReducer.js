import { createSlice } from '@reduxjs/toolkit';
import anecdotesService from '../services/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      return [...state, action.payload];
    },
    updateAnecdote(state, action) {
      return state.map((anecdote) => (anecdote.id === action.payload.id ? action.payload : anecdote));
    },
  },
});

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.createAnecdote(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdotesService.updateAnecdote(anecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdotesSlice.reducer;

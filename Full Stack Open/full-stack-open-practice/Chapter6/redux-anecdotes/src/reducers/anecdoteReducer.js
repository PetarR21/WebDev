import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdote';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return [...state, action.payload];
    },
    voteForAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id);
      const votedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
      return state.map((anecdote) => (anecdote.id === id ? votedAnecdote : anecdote));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, voteForAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(savedAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(voteForAnecdote(anecdote.id));
  };
};

export default anecdoteSlice.reducer;

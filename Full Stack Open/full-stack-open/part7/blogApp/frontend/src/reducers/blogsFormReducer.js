import { createSlice } from '@reduxjs/toolkit';

const blogsFormSlice = createSlice({
  name: 'blogsForm',
  initialState: {},
  reducers: {
    setBlogsForm(state, action) {
      return action.payload;
    },
  },
});

export const { setBlogsForm } = blogsFormSlice.actions;
export default blogsFormSlice.reducer;

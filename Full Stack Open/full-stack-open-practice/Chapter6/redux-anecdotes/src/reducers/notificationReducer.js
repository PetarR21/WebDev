import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

let timeoutID = null;

export const addNotification = (message, time) => {
  return (dispatch) => {
    if (timeoutID !== null) {
      clearTimeout(timeoutID);
    }

    dispatch(setNotification(message));
    timeoutID = setTimeout(() => {
      dispatch(setNotification(null));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;

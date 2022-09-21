import { createSlice } from '@reduxjs/toolkit';

let timeoutId = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return null;
    },
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;

export const setNotificationFor = (message, timeout) => {
  return (dispatch) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    dispatch(setNotification(message));
    timeoutId = setTimeout(() => {
      dispatch(removeNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;

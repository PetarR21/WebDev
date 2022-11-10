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

let timeout = null;

export const showNotification = (notification, time) => {
  return (dispatch) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    dispatch(setNotification(notification));
    timeout = setTimeout(() => {
      dispatch(setNotification(null));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

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

let timeoutId = null;
export const setNotificationFor = (notification, timeout) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    dispatch(setNotification(notification));
    timeoutId = setTimeout(() => {
      dispatch(removeNotification());
    }, timeout * 1000);
  };
};

export default notificationSlice.reducer;

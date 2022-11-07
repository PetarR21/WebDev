const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data];
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id;
      const noteToChange = state.find((note) => note.id === id);
      const changedNote = { ...noteToChange, important: !noteToChange.imortant };

      return state.map((note) => (note.id === changedNote.id ? changedNote : note));
    default:
      return state;
  }
};

export default noteReducer;

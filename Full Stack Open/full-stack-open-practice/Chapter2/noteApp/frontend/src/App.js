import { useState, useEffect } from 'react';

import noteService from './services/note';

import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((notes) => setNotes(notes));
  });

  const addNote = (event) => {
    event.preventDefault();
    const newNoteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    };
    setNotes(notes.concat(newNoteObject));
    setNewNote('');
  };

  const notesToShow = showAll ? notes : [...notes].filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {[...notesToShow].map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={({ target }) => setNewNote(target.value)} />
        <button type='submit'>save</button>
      </form>
    </div>
  );
};

export default App;

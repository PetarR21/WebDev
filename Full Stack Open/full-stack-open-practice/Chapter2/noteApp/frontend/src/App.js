import { useState, useEffect } from 'react';

import noteService from './services/note';

import Note from './components/Note';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...');

  useEffect(() => {
    noteService.getAll().then((notes) => setNotes(notes));
  }, []);

  const addNote = async (event) => {
    event.preventDefault();
    const newNoteObject = {
      content: newNote,
    };
    const savedNote = await noteService.create(newNoteObject);
    setNotes(notes.concat(savedNote));
    setNewNote('');
  };

  const toggleImportanceOf = async (id) => {
    const noteToUpdate = notes.find((note) => note.id == id);
    try {
      const updatedNote = await noteService.updateNote(id, { ...noteToUpdate, important: !noteToUpdate.important });

      setNotes(notes.map((note) => (note.id == id ? updatedNote : note)));
    } catch (error) {
      setErrorMessage(`Note '${noteToUpdate.content}' was already removed from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNotes(notes.filter((n) => n.id !== id));
    }
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
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
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

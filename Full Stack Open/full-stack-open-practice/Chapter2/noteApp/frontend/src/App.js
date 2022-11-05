import { useState, useEffect } from 'react';

import noteService from './services/note';
import loginService from './services/login';

import Note from './components/Note';
import Footer from './components/Footer';
import Notification from './components/Notification';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((notes) => setNotes(notes));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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
    const noteToUpdate = notes.find((note) => note.id === id);
    try {
      const updatedNote = await noteService.updateNote(id, { ...noteToUpdate, important: !noteToUpdate.important });

      setNotes(notes.map((note) => (note.id === id ? updatedNote : note)));
    } catch (error) {
      setErrorMessage(`Note '${noteToUpdate.content}' was already removed from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={({ target }) => setNewNote(target.value)} />
      <button type='submit'>save</button>
    </form>
  );

  const notesToShow = showAll ? notes : [...notes].filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in{' '}
            <button
              onClick={() => {
                window.localStorage.removeItem('loggedNoteappUser');
                setUser(null);
                noteService.setToken(null);
              }}
            >
              log out
            </button>
          </p>

          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map((note, i) => (
          <Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>

      <Footer />
    </div>
  );
};

export default App;

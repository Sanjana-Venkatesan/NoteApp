import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Note from './components/notes';
import noteService from './services/notes';
import loginService from './services/login';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';
import './App.css';

const App = () => {
  // State Variables
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  // Fetch logged-in user from localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
      console.log(user)
    }
  }, []);

  // Fetch notes when user is logged in
  useEffect(() => {
    if (user) {
      noteService.getnotesofuser(user.userId).then((initialNotes) => setNotes(initialNotes));
    }
  }, [user]);

  // Handle login
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.error(exception);
      alert('Invalid username or password');
    }
  };

  // Handle logout
  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
    noteService.setToken(null);
  };

  // Add a new note
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to add note');
      });
  };

  // Toggle importance of a note
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) {
      alert('Note not found');
      return;
    }

    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNote : note)));
      })
      .catch((error) => {
        console.error(error);
        alert(`The note '${note.content}' was already deleted from the server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const deleteNote = (id) => {
    noteService
      .deleteNote(id)  // Call the delete service function
      .then(() => {
        // Remove the deleted note from the state
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to delete the note');
      });
  };
  
  // Edit a note
  const editNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (!noteToEdit) {
      alert('Note not found');
      return;
    }

    setEditingNoteId(id);
    setEditedContent(noteToEdit.content);
  };

  // Save edited note
  const saveEdit = () => {
    const updatedNote = {
      ...notes.find((note) => note.id === editingNoteId),
      content: editedContent,
    };

    noteService
      .update(editingNoteId, updatedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id === editingNoteId ? returnedNote : note)));
        setEditingNoteId(null);
        setEditedContent('');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to update the note');
      });
  };

  // Cancel editing a note
  const cancelEdit = () => {
    setEditingNoteId(null);
    setEditedContent('');
  };

  // Note Form Component
  const noteForm = () => (
    <form className="new-note-form" onSubmit={addNote}>
      <input
        className="new-note-input"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Write a new note"
      />
      <button className="new-note-button" type="submit">Save</button>
    </form>
  );

  // Authentication Forms
  const authForms = () => (
    <div>
      {showLogin ? (
        <div>
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
          <button 
            className="auth-switch-button"
            onClick={() => { setShowLogin(false); setShowRegister(true); }}
          >
            Don't have an account? Register
          </button>
        </div>
      ) : showRegister ? (
        <RegisterForm 
          setShowRegister={setShowRegister} 
          setShowLogin={setShowLogin} 
        />
      ) : null}
    </div>
  );

  // Main Application UI
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Router>
      <h1 className="app-header">Notes</h1>
      {user === null ? (
        authForms()
      ) : (
        <div>
          <div className="user-info">
            <p className="user-greeting">Hi {user.name} </p>
            <button 
              className="logout-button" 
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          {noteForm()}
          <button 
            className="toggle-view-button"
            onClick={() => setShowAll(!showAll)}
          >
             {showAll ? 'favourites' : 'Back to all notes'}
          </button>
          <ul className="notes-list">
          {notes.length !== 0 ? (
            notes
            .filter((note) => (showAll ? true : note.important))
            .map((note) => (
            <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            isEditing={editingNoteId === note.id}
            editedContent={editedContent}
            setEditedContent={setEditedContent}
            saveEdit={saveEdit}
            startEditing={() => editNote(note.id)}
            cancelEdit={cancelEdit}
            deleteNote={deleteNote}  
            />
          ))
        ) : (
        <div style={{ textAlign: 'center', fontSize: '1.2rem', color: '#4A5568', padding: '20px' }}>
        <p>🎉 You have no notes! Add a new one and start writing something amazing!</p>
        <p style={{ fontSize: '1rem', color: '#718096' }}>Click the save button to add a new note!</p>
        </div>
      )}
      </ul>
      </div>
    )}
    </div>
  );
};

export default App;

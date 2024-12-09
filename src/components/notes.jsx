import React from 'react';
import './mystyles.css'; 

const Note = ({
  note,
  toggleImportance,
  isEditing,
  editedContent,
  setEditedContent,
  saveEdit,
  startEditing,
  cancelEdit,
  deleteNote,
}) => {
  return (
    <li className="note-item">
      {isEditing ? (
        <>
          <textarea
            className="note-textarea"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={4}
          />
          <div className="note-button-group">
            <button className="note-button note-button-save" onClick={saveEdit}>Save</button>
            <button className="note-button note-button-cancel" onClick={cancelEdit}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span className="note-content">{note.content}</span>
          <div className="note-button-group">
            <button 
              className={`note-button note-button-important ${note.important ? 'favourite' : ''}`} 
              onClick={toggleImportance}
            >
              {note.important ? '★' : '☆'}
            </button>
            <button 
              className="note-button note-button-edit" 
              onClick={startEditing}
            >
              Edit
            </button>
            <button 
              className="note-button note-button-delete" 
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Note;
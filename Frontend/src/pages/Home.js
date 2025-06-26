import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNotes, deleteNote } from '../api/notesApi';
import NoteCard from '../components/NoteCard';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const data = await getAllNotes();
      setNotes(data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id , CreatedAt) => {
    try {
      await deleteNote(id , CreatedAt);
      setNotes((prev) => prev.filter((note) => note.NoteID !== id));
    } catch (err) {
      console.error('Error deleting note:', err);
      alert('Failed to delete note');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="notes-home">
      <div className="notes-header">
        <h2>All Notes</h2>
        <Link to="/create" className="create-button">+ New Note</Link>
      </div>

      {loading ? (
        <p>Loading notes...</p>
      ) : (
        notes.length ? (
          notes.map((note) => (
            <NoteCard key={note.NoteID} note={note} onDelete={handleDelete} />
          ))
        ) : (
          <p>No notes yet. Try creating one!</p>
        )
      )}
    </div>
  );
};

export default Home;
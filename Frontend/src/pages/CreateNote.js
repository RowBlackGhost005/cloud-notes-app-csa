import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createNote } from '../api/notesApi';
import NoteForm from '../components/NoteForm';

const CreateNote = () => {
    const navigate = useNavigate();

    const handleCreateNote = async (formData) => {
        try {
            await createNote(formData);
            navigate('/notes');
        } catch (err) {
            console.error('Error creating note:', err);
            alert('Failed to create note. Please try again.');
        }
    };

    return (
        <div>
            <h2 className='text-center'>Create a New Note</h2>
            <NoteForm onSubmit={handleCreateNote} />
        </div>
  );
};

export default CreateNote;
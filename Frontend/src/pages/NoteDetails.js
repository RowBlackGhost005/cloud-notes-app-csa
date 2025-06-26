import React, { useEffect, useState } from 'react';
import { useParams, useNavigate , useLocation} from 'react-router-dom';
import { getNoteById } from '../api/notesApi';

const NoteDetails = () => {
    const { id } = useParams();
    const query = new URLSearchParams(useLocation().search);
    const createdAt = query.get('createdAt');

  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await getNoteById(id , createdAt);
        setNote(data);
      } catch (err) {
        console.error('Error fetching note:', err);
        alert('Note not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  if (loading) return <p>Loading note...</p>;
  if (!note) return null;

  const { Title, Content, CreatedAt, FileUrl } = note;

  const formattedDate = new Date(CreatedAt).toLocaleString();
  const fileName = FileUrl
    ? decodeURIComponent(new URL(FileUrl).pathname.split('/').pop())
    : null;

  return (
    <div className="note-details">
      <h2>{Title}</h2>
      <p><strong>Created:</strong> {formattedDate}</p>
      <p>{Content}</p>
      { FileUrl && (
        <p>
          <strong>Attachment:</strong>{' '}
          <a href={FileUrl} target="_blank" rel="noopener noreferrer">{fileName}</a>
        </p>
      )}
      <button onClick={() => navigate(-1)} style={{ marginTop: '1rem' }}>
        ← Back
      </button>
    </div>
  );
};

export default NoteDetails;
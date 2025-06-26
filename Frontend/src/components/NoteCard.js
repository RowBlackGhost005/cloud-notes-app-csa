import React from 'react';
import { Link } from 'react-router-dom';

const NoteCard = ({ note, onDelete }) => {
  const {
    NoteID,
    Title,
    Content,
    CreatedAt,
    FileUrl
  } = note;

  console.log(FileUrl);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(NoteID , CreatedAt);
    }
  };

  const formattedDate = new Date(CreatedAt).toLocaleString();

  const fileName = FileUrl
    ? decodeURIComponent(new URL(FileUrl).pathname.split('/').pop())
    : null;

  return (
    <div className="note-card">
      <h3>{Title}</h3>
      <p>{Content}</p>
      <p><strong>Created:</strong> {formattedDate}</p>

      {FileUrl && (
        <p>
          <strong>Attachment:</strong>{' '}
          <a href={FileUrl} target="_blank" rel="noopener noreferrer">
            {fileName}
          </a>
        </p>
      )}

      <div className="note-actions">
        <Link to={`/notes/${NoteID}?createdAt=${CreatedAt}`}>View</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
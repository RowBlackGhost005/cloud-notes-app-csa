import React, { useState } from 'react';

const NoteForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      content,
      file
    };

    onSubmit(formData);

    setTitle('');
    setContent('');
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="file">Attachment (optional):</label>
        <input
          id="file"
          type="file"
          accept="*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file && <p>Selected: {file.name}</p>}
      </div>

      <button type="submit">Create Note</button>
    </form>
  );
};

export default NoteForm;
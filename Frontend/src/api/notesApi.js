import React from 'react';

const API_BASE = 'https://fzwbneiw08.execute-api.us-east-1.amazonaws.com';

export async function createNote({ title, content, file }) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    if (file) formData.append('file', file);

    for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }


    const res = await fetch(`${API_BASE}/api/notes`, {
        method: 'POST',
        body: formData
    });
    

    if (!res.ok) throw new Error('Failed to create note');
        return await res.json();
}

export async function getAllNotes() {
    const res = await fetch(`${API_BASE}/api/notes`);
    if (!res.ok) throw new Error('Failed to fetch notes');
    return await res.json();
}

export async function getNoteById(id) {
    const res = await fetch(`${API_BASE}/api/notes/${id}`);
    if (!res.ok) throw new Error('Note not found');
    return await res.json();
}

export async function deleteNote(id) {
    const res = await fetch(`${API_BASE}/api/notes/${id}`, {
        method: 'DELETE'
    });

    if (!res.ok) throw new Error('Failed to delete note');
    return await res.json();
}

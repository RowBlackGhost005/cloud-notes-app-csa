import React from 'react';

const API_BASE = 'https://fzwbneiw08.execute-api.us-east-1.amazonaws.com';

export async function createNote({ title, content, file }) {
    let fileUrl = null;

    // Step 1: Upload file to S3 if present
    if (file instanceof File && file.size > 0) {
        // Request a pre-signed URL from your backend
        const presignRes = await fetch(`${API_BASE}/api/upload-url`, {
            method: 'POST',
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!presignRes.ok) throw new Error('Failed to get upload URL');
            const { uploadUrl } = await presignRes.json();

            // Upload the file directly to S3
            const uploadRes = await fetch(uploadUrl, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': file.type }
            });

        if (!uploadRes.ok) throw new Error('Failed to upload file to S3');

        // Strip query params to get the clean file URL
        fileUrl = uploadUrl.split('?')[0];
    }

    // Step 2: Create the note with metadata and optional fileUrl
    const noteRes = await fetch(`${API_BASE}/api/notes`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
            fileUrl
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (!noteRes.ok) throw new Error('Failed to create note');
    return await noteRes.json();
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

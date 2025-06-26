import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './styles.css';

import CreateNote from './pages/CreateNote'
import NoteDetails from './pages/NoteDetails';
import Home from './pages/Home';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<CreateNote/>}/>
        <Route path="/notes/:id" element={<NoteDetails />} />
      </Routes>
    </main>
  );
}

export default App;

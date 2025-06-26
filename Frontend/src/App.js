import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import './styles.css';

import CreateNote from './pages/CreateNote'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<CreateNote/>}/>
      </Routes>
    </main>
  );
}

export default App;

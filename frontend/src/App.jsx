import React, { useState } from 'react'
import HomePage from './pages/HomePage'
import NoteDetailPage from './pages/NoteDetailPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { mockData } from './data/mockNotes';

const App = () => {
    const [notes, setNotes] = useState(mockData)
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage notes={notes} setNotes={setNotes} />} />
                <Route path="/note/:id" element={<NoteDetailPage notes={notes} setNotes={setNotes} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

import React from 'react'
import HomePage from './pages/HomePage'
import NoteDetailPage from './pages/NoteDetailPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/note/:id" element={<NoteDetailPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

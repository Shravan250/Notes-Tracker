import React, { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import NoteDetailPage from './pages/NoteDetailPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const App = () => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        const fetchNotes = async () => {
            try{
                const res = await fetch('http://localhost:5001/api/notes')
                const data = await res.json()
                setNotes(data)
            }catch(error){
                console.error("Failed to fetch notes:", error);
            }
        }

        fetchNotes()
    }, [])
    
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

import express from "express"
import Note from "../models/note.model.js"

const router = express.Router()

// @route   GET /api/notes
// @desc    Get all notes
router.get('/' , async(req ,res) => {
    try{
        const notes = await Note.find()
        res.json(notes)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

// @route   POST /api/notes
// @desc    Create a new note
router.post('/' , async (req, res) => {
    try{
        const note = new Note({
            title: req.body.title,
            content: req.body.content
        })
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

export default router
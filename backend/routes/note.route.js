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
            content: req.body.content,
            color: req.body.color
        })
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

// @route   PUT /api/notes/:id
// @desc    Update a note
router.put('/:id' , async (req, res) => {
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"})
        }
        note.title = req.body.title;
        note.content = req.body.content;
        const updatedNote = await note.save();
        res.status(201).json(updatedNote);
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

// @route   DELETE /api/notes/:id
// @desc    Delete a note
router.delete('/:id' , async (req, res) => {
    try{
        const note = await Note.findByIdAndDelete(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"})
        }
        res.status(201).json(note);
    }catch(error){
        res.status(400).json({message: error.message})
    }
})

export default router
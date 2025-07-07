import React, { useEffect, useState } from "react";
import { Search, Info, Plus, Trash2, Check } from "lucide-react";
import { noteColors } from "../data/mockNotes.js";
import { Link, useNavigate } from "react-router-dom";

const HomePage = ({notes, setNotes}) => {
  const navigate = useNavigate();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);

  const handleAddNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      content: "",
      color: noteColors[Math.floor(Math.random() * noteColors.length)],
    };

    setNotes([...notes, newNote]);

    navigate(`/note/${newNote.id}`);
  };

  const handleToggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedNotes([]);
  };

  const handleSelectedNotes = (noteId, e) => {
    e.preventDefault();
    if (selectedNotes.includes(noteId)) {
      setSelectedNotes(selectedNotes.filter((id) => id !== noteId));
    } else {
      setSelectedNotes([...selectedNotes, noteId]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedNotes = notes.filter(
      (note) => !selectedNotes.includes(note.id)
    );
    setNotes(updatedNotes);
    setSelectedNotes([]);
    setIsDeleteMode(false);
  };

  return (
    <div className="bg-[#252525] text-white min-h-screen p-4 max-w-[414px] mx-auto relative">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Notes</h1>
        <div className="flex items-center gap-2">
          <button className="p-3 bg-[#3B3B3B] rounded-lg hover:bg-slate-600">
            <Search className="h-4 w-4" />
          </button>
          {!isDeleteMode && (
            <button
              onClick={handleToggleDeleteMode}
              className="p-3 bg-[#3B3B3B] rounded-lg hover:bg-slate-600"
            >
              <Trash2 className="h-4 w-4 text-white" />
            </button>
          )}
          <button className="p-3 bg-[#3B3B3B] rounded-lg hover:bg-slate-600">
            <Info className="h-4 w-4" />
          </button>
        </div>
      </header>

      <main className="grid grid-col-1 gap-4">
        {isDeleteMode && (
          <button
            className="text-center flex items-center justify-center px-4 py-6 rounded-lg bg-[#F00] hover:bg-[#D00]"
            onClick={handleDeleteSelected}
          >
            <Trash2 className="h-8 not-first-of-type:w-8 text-white" />
          </button>
        )}
        {notes.map((note) => {
          const isSelected = selectedNotes.includes(note.id);
          return (
            <div key={note.id} className="relative">
              {isDeleteMode ? (
                <div
                  className={`p-4 rounded-lg cursor-pointer border-2 ${
                    isSelected ? "border-red-500" : "border-transparent"
                  }`}
                  style={{ backgroundColor: note.color }}
                  onClick={(e) => handleSelectedNotes(note.id, e)}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                  <p className="text-lg text-black font-medium">{note.title}</p>
                </div>
              ) : (
                <Link to={`/note/${note.id}`}>
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: note.color }}
                  >
                    <p className="text-lg text-black font-medium">
                      {note.title}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </main>

      {!isDeleteMode && (
        <button
          className="absolute bottom-8 right-8 bg-slate-800 text-white p-4 rounded-full shadow-lg hover:bg-slate-700"
          onClick={handleAddNewNote}
        >
          <Plus className="h-12 w-12" />
        </button>
      )}
    </div>
  );
};

export default HomePage;

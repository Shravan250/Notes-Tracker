import React, { useEffect, useState } from "react";
import { Search, Plus, Trash2, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import InfoPopOver from "@/components/InfoPopOver.jsx";

const noteColors = ["#FF9D9E", "#90F48E", "#FFF599", "#9DFFFF", "#B69CFF"];

const HomePage = ({ notes, setNotes }) => {
  const navigate = useNavigate();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleAddNewNote = async () => {
    const newNote = {
      title: "New Note",
      content: " ",
      color: noteColors[Math.floor(Math.random() * noteColors.length)],
    };

    try {
      const res = await fetch("http://localhost:5001/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Backend request failed");
      }

      const data = await res.json();
      setNotes([...notes, data]);
      navigate(`/note/${data._id}`);
    } catch (error) {
      console.error("Failed to add note:", error.message);
    }
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

  const handleDeleteSelected = async () => {
    try {
      const deletePromises = selectedNotes.map((noteId) =>
        fetch(`http://localhost:5001/api/notes/${noteId}`, {
          method: "DELETE",
        })
      );
      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Failed to delete notes:", error.message);
    }

    const updatedNotes = notes.filter(
      (note) => !selectedNotes.includes(note._id)
    );
    setNotes(updatedNotes);
    setSelectedNotes([]);
    setIsDeleteMode(false);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#252525] text-white min-h-screen p-4 max-w-[414px] mx-auto relative">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Notes</h1>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center bg-[#3B3B3B] rounded-lg p-2 transition-all duration-300 ease-in-out`}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => setIsSearchVisible(false)}
              autoFocus
              className={`bg-transparent focus:outline-none transition-all duration-300 ease-in-out ${
                isSearchVisible ? "w-32 ml-2" : "w-0"
              }`}
            />
            <Search
              className="h-5 w-5 cursor-pointer"
              onClick={() => setIsSearchVisible(true)}
            />
          </div>
          {!isDeleteMode && (
            <button
              onClick={handleToggleDeleteMode}
              className="p-3 bg-[#3B3B3B] rounded-lg hover:bg-slate-600"
            >
              <Trash2 className="h-4 w-4 text-white" />
            </button>
          )}
          <InfoPopOver />
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
        {filteredNotes.map((note) => {
          const isSelected = selectedNotes.includes(note._id);
          return (
            <div key={note._id} className="relative">
              {isDeleteMode ? (
                <div
                  className={`p-4 rounded-lg cursor-pointer border-2 ${
                    isSelected ? "border-red-500" : "border-transparent"
                  }`}
                  style={{ backgroundColor: note.color }}
                  onClick={(e) => handleSelectedNotes(note._id, e)}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                  <p className="text-lg text-black font-medium">{note.title}</p>
                </div>
              ) : (
                <Link to={`/note/${note._id}`}>
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

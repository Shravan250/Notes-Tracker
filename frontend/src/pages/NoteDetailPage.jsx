import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { ArrowLeft, Edit, Eye, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const NoteDetailPage = ({ notes, setNotes }) => {
  const { id } = useParams();
  const note = notes.find((note) => note.id === parseInt(id));

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSave = () => {
    const noteIndex = notes.findIndex((note) => note.id === parseInt(id));

    if (noteIndex !== -1) {
      notes[noteIndex].title = title;
      notes[noteIndex].content = content;
    }

    setIsEditing(false);
    setShowDiscardDialog(false);
    setShowSaveDialog(false);
  };

  const handleDiscard = () => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
    setShowDiscardDialog(false);
    setShowSaveDialog(false);
  };

  useEffect(() => {
    if (note && note.title === "" && note.content === "") {
      setIsEditing(true);
    }
  }, [note]);

  if (!note) {
    return (
      <div className="bg-[#252525] text-white min-h-screen p-4 max-w-[414px] mx-auto">
        <h1 className="text-4xl font-bold">Note not found</h1>
        <Link to="/" className="text-blue-400 hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#252525] text-white min-h-screen p-4 max-w-[414px] mx-auto">
      <header className="flex justify-between items-center my-8 pt-5">
        <Link to="/" className="p-3 bg-[#3B3B3B] rounded-lg hover:bg-slate-600">
          <ArrowLeft className="h-6 w-6" />
        </Link>

        {isEditing ? (
          <div className="flex items-center gap-2">
            <button
              className="p-3 bg-[#3B3B3B] rounded-lg hover:bg-slate-600"
              // Add your save logic here
              onClick={() => setShowDiscardDialog(true)}
            >
              <Eye className="h-6 w-6" />
            </button>
            <button
              className="p-3 bg-[#3B3B3B] rounded-lg hover:bg-slate-600"
              // Add your cancel logic here
              onClick={() => setShowSaveDialog(true)}
            >
              <Save className="h-6 w-6" />
            </button>
          </div>
        ) : (
          <button
            className="p-3 bg-[#3B3B3B] rounded-lg hover:bg-slate-600"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-6 w-6" />
          </button>
        )}
      </header>

      <main>
        {isEditing ? (
          <>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full bg-transparent text-[35px] font-bold mb-4 focus:outline-none border-b border-gray-600"
              placeholder="Title"
            />
            <textarea
              value={content}
              onChange={handleContentChange}
              className="w-full bg-transparent text-[23px] text-gray-300 whitespace-pre-wrap mt-4 h-64 focus:outline-none resize-none"
              placeholder="Start typing..."
            />
          </>
        ) : (
          <>
            <h1 className="text-[35px] font-bold mb-4">{title}</h1>
            <p className="text-[23px] text-gray-300 whitespace-pre-wrap">
              {content}
            </p>
          </>
        )}
      </main>

      <ConfirmationDialog
        open={showSaveDialog}
        onOpenChange={setShowSaveDialog}
        title="Save changes ?"
        description=""
        onConfirm={handleSave}
        onCancel={handleDiscard}
        confirmText="Save"
        cancelText="Discard"
      />

      <ConfirmationDialog
        open={showDiscardDialog}
        onOpenChange={setShowDiscardDialog}
        title="Are you sure you want to discard these changes?"
        description=""
        onConfirm={handleSave}
        onCancel={handleDiscard}
        confirmText="Keep"
        cancelText="Discard"
      />
    </div>
  );
};

export default NoteDetailPage;

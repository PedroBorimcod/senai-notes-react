import "./notas.css";
import Logo from "../../assets/imgs/Logo Wrapper.png";
import HomeIcon from "../../assets/imgs/Home.svg";
import ArchiveIcon from "../../assets/imgs/Archive.png";
import TagIcon from "../../assets/imgs/Tag.png";
import SearchIcon from "../../assets/imgs/Search.png";
import SettingsIcon from "../../assets/imgs/Setting.png";
import TopbarIcon from "../../assets/imgs/Topbar Item.png";
import NoteThumb1 from "../../assets/imgs/Rectangle 44 (1).png";
import NoteThumb2 from "../../assets/imgs/Rectangle 45.png";
import NoteThumb3 from "../../assets/imgs/Rectangle 45 (1).png";
import ClockIcon from "../../assets/imgs/Circle Clock.png";
import DeleteIcon from "../../assets/imgs/Delete.png";
import { useState } from "react";

function Notes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Untitled Note",
      tags: [],
      date: "27 May 2025",
      thumb: NoteThumb1,
      archived: false,
    },
    {
      id: 2,
      title: "React Performance Op...",
      tags: ["Dev", "React"],
      date: "29 Oct 2024",
      thumb: NoteThumb2,
      archived: false,
    },
    {
      id: 3,
      title: "Japan Travel Planning",
      tags: ["Travel", "Personal"],
      date: "28 Oct 2024",
      thumb: NoteThumb3,
      archived: false,
    },
  ]);

  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // 'all' ou 'archived'

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      tags: [],
      date: new Date().toLocaleDateString(),
      thumb: NoteThumb1,
      archived: false,
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
    setActiveTab("all");
  };

  const handleSelectNote = (id) => {
    setSelectedNoteId(id);
  };

  const handleDeleteNote = () => {
    setNotes((prev) => prev.filter((note) => note.id !== selectedNoteId));
    setSelectedNoteId(null);
  };

  const handleArchiveNote = () => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedNoteId ? { ...note, archived: true } : note
      )
    );
    setSelectedNoteId(null);
    setActiveTab("archived");
  };

  const handleUnarchiveNote = () => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedNoteId ? { ...note, archived: false } : note
      )
    );
    setSelectedNoteId(null);
    setActiveTab("all");
  };

  // Filtra notas conforme aba ativa
  const displayedNotes =
    activeTab === "all"
      ? notes.filter((note) => !note.archived)
      : notes.filter((note) => note.archived);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  return (
    <div className="td">
      <aside>
        <div className="logo"><img src={Logo} alt="" /></div>
        <div className="sidebar-section">
          <div
            className={`sidebar-item ${activeTab === "all" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("all");
              setSelectedNoteId(null);
            }}
          >
            <img src={HomeIcon} alt="" /> All Notes
          </div>
          <div
            className={`sidebar-item ${activeTab === "archived" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("archived");
              setSelectedNoteId(null);
            }}
          >
            <img src={ArchiveIcon} alt="" /> Archived Notes
          </div>
        </div>
        <div className="sidebar-section">
          <h4>Tags</h4>
          {[
            "Cooking",
            "Dev",
            "Fitness",
            "Health",
            "Personal",
            "React",
            "Recipes",
            "Shopping",
            "Travel",
            "TypeScript",
          ].map((tagName) => (
            <div key={tagName} className="sidebar-item">
              <img src={TagIcon} alt="" /> {tagName}
            </div>
          ))}
        </div>
      </aside>

      <main>
        <header className="header">
          <h1>{activeTab === "all" ? "All Notes" : "Archived Notes"}</h1>
          <img src={SearchIcon} alt="" className="pesq" />
          <input type="text" placeholder="Search by title, content, or tags..." />
          <img src={SettingsIcon} alt="configs" />
          <img src={TopbarIcon} alt="" />
        </header>

        <div className="content">
          <div className="notes-list">
            {activeTab === "all" && (
              <button onClick={handleCreateNote}>+ Create New Note</button>
            )}

            {displayedNotes.length === 0 && (
              <p style={{ padding: "1rem", fontStyle: "italic", color: "#999" }}>
                {activeTab === "all"
                  ? "No notes available."
                  : "No archived notes."}
              </p>
            )}

            {displayedNotes.map((note) => (
              <div
                key={note.id}
                className="note-item"
                onClick={() => handleSelectNote(note.id)}
              >
                <img src={note.thumb} alt="Thumbnail" />
                <div className="note-info">
                  <strong>{note.title}</strong>
                  {note.tags.length > 0 && (
                    <div className="tags">
                      {note.tags.map((tag, index) => (
                        <div key={index} className="tag">
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}
                  <small>{note.date}</small>
                </div>
              </div>
            ))}
          </div>

          {selectedNote ? (
            <>
              <div className="note-detail">
                <img src={selectedNote.thumb} alt="Note banner" />
                <h2>{selectedNote.title}</h2>
                <div className="meta">
                  <img src={TagIcon} alt="" />
                  Tags:
                  <input
                    type="text"
                    placeholder="Add tags separated by commas (e.g. Work, Planning)"
                    className="text-input"
                  />
                </div>
                <div className="meta">
                  <img src={ClockIcon} alt="" />
                  Last edited:
                  <input
                    type="text"
                    value={selectedNote.date}
                    className="text-input"
                    readOnly
                  />
                </div>

                <div className="ins">
                  <input type="text" placeholder="Start typing your note here…" />
                </div>

                <footer>
                  <button className="save">Save Note</button>
                  <button className="cancel" onClick={() => setSelectedNoteId(null)}>
                    Cancel
                  </button>
                </footer>
              </div>

              <div className="note-actions">
                {!selectedNote.archived ? (
                  <button onClick={handleArchiveNote}>
                    <img src={ArchiveIcon} alt="" /> Archive Note
                  </button>
                ) : (
                  <button onClick={handleUnarchiveNote}>
                    <img src={ArchiveIcon} alt="" /> Unarchive Note
                  </button>
                )}
                <button onClick={handleDeleteNote}>
                  <img src={DeleteIcon} alt="" /> Delete Note
                </button>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p style={{ padding: "2rem", fontStyle: "italic", color: "#999" }}>
                Nenhuma nota selecionada.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Notes;

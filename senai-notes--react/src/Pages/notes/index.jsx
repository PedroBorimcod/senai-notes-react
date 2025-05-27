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
import { useState, useRef, useEffect } from "react";

function Notes() {
  const LOCAL_STORAGE_KEY = "notasApp";

  const defaultNotes = [
    {
      id: 1,
      title: "Untitled Note",
      tags: [],
      date: "27 May 2025",
      thumb: NoteThumb1,
      archived: false,
      content: "",
    },
    {
      id: 2,
      title: "React Performance Op...",
      tags: ["Dev", "React"],
      date: "29 Oct 2024",
      thumb: NoteThumb2,
      archived: false,
      content: "",
    },
    {
      id: 3,
      title: "Japan Travel Planning",
      tags: ["Travel", "Personal"],
      date: "28 Oct 2024",
      thumb: NoteThumb3,
      archived: false,
      content: "",
    },
  ];

  const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
  const [notes, setNotes] = useState(savedNotes ? JSON.parse(savedNotes) : defaultNotes);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchText, setSearchText] = useState("");  // Estado para o texto da busca
  const fileInputRef = useRef();

  const selectedNote = notes.find((note) => note.id === selectedNoteId);
  const [editTitle, setEditTitle] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (selectedNote) {
      setEditTitle(selectedNote.title);
      setEditTags(selectedNote.tags.join(", "));
      setEditContent(selectedNote.content || "");
    }
  }, [selectedNoteId]);

  const saveToLocalStorage = (updatedNotes) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
  };

  const handleCreateNote = () => {
    const newNote = {
      id: Date.now(),
      title: "New Note",
      tags: [],
      date: new Date().toLocaleDateString(),
      thumb: NoteThumb1,
      archived: false,
      content: "",
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    setSelectedNoteId(newNote.id);
    setActiveTab("all");
    saveToLocalStorage(updated);
  };

  const handleSaveNote = () => {
    const updated = notes.map((note) =>
      note.id === selectedNoteId
        ? {
            ...note,
            title: editTitle,
            tags: editTags
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t),
            content: editContent,
            date: new Date().toLocaleDateString(),
          }
        : note
    );
    setNotes(updated);
    saveToLocalStorage(updated);
  };

  const handleDeleteNote = () => {
    const updated = notes.filter((note) => note.id !== selectedNoteId);
    setNotes(updated);
    setSelectedNoteId(null);
    saveToLocalStorage(updated);
  };

  const handleArchiveNote = () => {
    const updated = notes.map((note) =>
      note.id === selectedNoteId ? { ...note, archived: true } : note
    );
    setNotes(updated);
    setSelectedNoteId(null);
    setActiveTab("archived");
    saveToLocalStorage(updated);
  };

  const handleUnarchiveNote = () => {
    const updated = notes.map((note) =>
      note.id === selectedNoteId ? { ...note, archived: false } : note
    );
    setNotes(updated);
    setSelectedNoteId(null);
    setActiveTab("all");
    saveToLocalStorage(updated);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && selectedNoteId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = notes.map((note) =>
          note.id === selectedNoteId ? { ...note, thumb: reader.result } : note
        );
        setNotes(updated);
        saveToLocalStorage(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  // Filtra notas por aba e também pelo texto da busca
  const displayedNotes = (activeTab === "all"
    ? notes.filter((note) => !note.archived)
    : notes.filter((note) => note.archived)
  ).filter((note) => {
    const search = searchText.toLowerCase();
    return (
      note.title.toLowerCase().includes(search) ||
      note.content.toLowerCase().includes(search) ||
      note.tags.some((tag) => tag.toLowerCase().includes(search))
    );
  });

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
              setSearchText(""); // limpa busca ao trocar de aba
            }}
          >
            <img src={HomeIcon} alt="" /> All Notes
          </div>
          <div
            className={`sidebar-item ${activeTab === "archived" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("archived");
              setSelectedNoteId(null);
              setSearchText(""); // limpa busca ao trocar de aba
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
          <input
            type="text"
            placeholder="Search by title, content, or tags..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
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
                onClick={() => setSelectedNoteId(note.id)}
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
                <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
                  <img src={selectedNote.thumb} alt="Note banner" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />

                <input
                  className="text-input"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "1rem" }}
                />

                <div className="meta">
                  <img src={TagIcon} alt="" />
                  Tags:
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="Add tags separated by commas"
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
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Start typing your note here…"
                    rows={8}
                    className="text-input"
                    style={{ width: "100%", resize: "vertical" }}
                  />
                </div>

                <footer>
                  <button className="save" onClick={handleSaveNote}>Save Note</button>
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

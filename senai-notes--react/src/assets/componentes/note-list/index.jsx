import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.css";
import { faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function NotesList({ enviarNota, tagSelecionada, somenteArquivadas, atualizarLista }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, [tagSelecionada, somenteArquivadas, atualizarLista]);

  const getNotes = async () => {
    try {
      const response = await fetch('http://localhost:3000/notes');
      if (!response.ok) throw new Error("Erro ao buscar notas");
      let data = await response.json();

      if (tagSelecionada) {
        data = data.filter(note =>
          note.tags.map(t => t.trim()).includes(tagSelecionada)
        );
      }

      if (somenteArquivadas) {
        data = data.filter(note => note.archived === true);
      }

      setNotes(data);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
      toast.error("Não foi possível carregar as notas.");
    }
  }

  const onCreateNote = async () => {
    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          title: "Nova anotação",
          description: "Escreva aqui sua descrição",
          tags: [],
          image: "/assets/sample.png",
          date: new Date().toISOString()
        })
      });

      if (response.ok) {
        toast.success("Anotação criada com sucesso!");
        await getNotes();
      } else {
        toast.error("Erro ao criar uma nota, tente novamente");
      }
    } catch (error) {
      console.error("Erro ao criar nota:", error);
      toast.error("Erro de rede ao criar a nota.");
    }
  }

  return (
    <div className="page__content__main__notes">
      <button className="btn__primary" onClick={onCreateNote}>
        + Create New Note
      </button>

      <div className="notes__list">
        {notes.map(note => (
          <div
            className="note__item"
            key={note.id}
            onClick={() => enviarNota(note)}
          >
            <div
              className="image"
              style={{ backgroundImage: `url('${note.image}')` }}
            ></div>
            <div className="texts">
              <p className="title">{note.title}</p>
              <div className="tags">
                {note.tags.map(tag => (
                  <span key={`${note.id}-${tag}`}>
                    <FontAwesomeIcon icon={faTag} className="icon" /> {tag}
                  </span>
                ))}
              </div>
              <p className="date">
                <FontAwesomeIcon icon={faClock} className="icon" />{" "}
                {new Date(note.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesList;

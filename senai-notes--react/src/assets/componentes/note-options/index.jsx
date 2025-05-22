import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

function NoteOptions({ notaSelecionada, aoFecharANota }) {
  const baseUrl = "http://localhost:3000/notes";

  const onArchiveNote = async () => {

    const res = await fetch(`${baseUrl}/${notaSelecionada.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ archived: true }),
    });

    if (!res.ok) {

      toast.error("Erro ao arquivar a nota");

    } else {

      toast.success(`Nota "${notaSelecionada.title}" arquivada!`);

    }

    aoFecharANota();

  }

  const onUnarchiveNote = async () => {

    const res = await fetch(`${baseUrl}/${notaSelecionada.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ archived: false }),
    });

    if (!res.ok) {

      toast.error("Erro ao desarquivar a nota");

    } else {

      toast.success(`Nota "${notaSelecionada.title}" desarquivada!`);

    }

    aoFecharANota();

  }

  const onDeleteNote = async () => {

    const res = await fetch(`${baseUrl}/${notaSelecionada.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Erro ao deletar a nota");
    } else {
      toast.success(`Nota "${notaSelecionada.title}" deletada!`);
    }

    aoFecharANota();

  };

  return (
    <div className="page__content__main__options">

      {notaSelecionada.archived && (
        <button onClick={onUnarchiveNote}>
          <FontAwesomeIcon icon={faBoxArchive} className="icon" />
          Unarchive Note
        </button>
      )}

      {!notaSelecionada.archived && (
        <button onClick={onArchiveNote}>
          <FontAwesomeIcon icon={faBoxArchive} className="icon" />
          Archive Note
        </button>
      )}

      <button onClick={onDeleteNote}>
        <FontAwesomeIcon icon={faTrash} className="icon" />
        Delete Note
      </button>
    </div>
  );
}

export default NoteOptions;

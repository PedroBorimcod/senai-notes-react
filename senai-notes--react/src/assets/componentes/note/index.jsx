import { faClock, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./style.css";

function Note({ notaSelecionada, aoFecharANota }) {

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {

    if (notaSelecionada) {
      setTitle(notaSelecionada.title);
      setTags(notaSelecionada.tags.join(", "));
      setDescription(notaSelecionada.description);
    }
  }, [notaSelecionada]);


  const onSaveNote = async () => {
    const toastId = toast.loading("Salvando a nota...");
    const response = await fetch(`http://localhost:3000/notes/${notaSelecionada.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...notaSelecionada,
        title,
        description,
        tags: tags.split(",").map(t => t.trim()),
        image: "assets/sample.png", 
        date: new Date().toISOString()
      })
    });

    if (response.ok) {
      toast.update(toastId, {
        render: "Nota salva com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 3000
      });
      setImage(null);
      setImageURL("");
    } else {
      toast.update(toastId, {
        render: "Erro ao salvar a nota.",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    }
  }

  const aoDefinirAImagem = event => {
    if (!event.target.files?.length) {
      toast.warn("É necessário selecionar uma imagem.");
      return;
    }
    const file = event.target.files[0];
    setImage(file);
    setImageURL(URL.createObjectURL(file));
  }

  return (
    <div className="page__content__main__note">
      {notaSelecionada ? (
        <>

          <label
            className="image"
            style={{ backgroundImage: `url('${imageURL || notaSelecionada.image}')` }}
          >
            <input type="file" className="file__input" onChange={aoDefinirAImagem} />
          </label>
        <input
            className="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <div className="info__list">
            <div className="info__item">
              <div className="info__name">
                <FontAwesomeIcon icon={faTag} className="icon" />
                <p>Tags</p>
              </div>
              <input
                type="text"
                value={tags}
                placeholder="Digite aqui as tags..."
                onChange={e => setTags(e.target.value)}
              />
            </div>

            <div className="info__item">
              <div className="info__name">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <p>Last edited</p>
              </div>
              <p>{new Date(notaSelecionada.date).toLocaleDateString()}</p>
            </div>
          </div>
          <textarea
            placeholder="Type your note..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <div className="buttons__container">
            <button className="btn__primary" onClick={onSaveNote}>Save</button>
            <button className="btn__secondary" onClick={aoFecharANota}>Cancel</button>
          </div>
        </>
      ) : (

        <p>Nenhuma nota selecionada no momento.</p>
      )}
    </div>
  );
}

export default Note;

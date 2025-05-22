import { useState } from "react";
import LeftPanel from "../../componentes/left-panel";
import NotesList from "../../componentes/notes-list";
import Note from "../../componentes/note";
import NoteOptions from "../../componentes/note-options";
import "./styles.css";
import Header from "../../assets/componentes/header";

function Notes() {
  const [tag, setTag] = useState('');
  const [nota, setNota] = useState(null);
  const [somenteArquivadas, setSomenteArquivadas] = useState(false);
  const [atualizarLista, setAtualizarLista] = useState(0);

  return (
    <>
      <div className="page__container">
        <LeftPanel 
          enviarTag={tag => setTag(tag)} 
          listarSomenteArquivadas={arquivadas => setSomenteArquivadas(arquivadas)}
        />

        <div className="page__content">
          <Header />

          <div className="page__content__main">
            <NotesList 
              enviarNota={nota => setNota(nota)} 
              tagSelecionada={tag} 
              somenteArquivadas={somenteArquivadas} 
              atualizarLista={atualizarLista}
            />

            <Note 
              notaSelecionada={nota}
              aoFecharANota={() => {
                setNota(null);
                setAtualizarLista(atualizarLista + 1);
              }}
            />

            {nota && (
              <NoteOptions 
                notaSelecionada={nota}
                aoFecharANota={() => {
                  setNota(null);
                  setAtualizarLista(atualizarLista + 1);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;

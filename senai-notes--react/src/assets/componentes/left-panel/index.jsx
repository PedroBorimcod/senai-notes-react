import { faBoxArchive, faHouse, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./style.css";

function LeftPanel({ enviarTag, listarSomenteArquivadas }) {

  const [tags, setTags] = useState([]);

  useEffect(() => {

    getTags();
  }, []);

  const getTags = async () => {
    const response = await fetch('http://localhost:3000/tags');
    const data = await response.json();
    setTags(data);
  }


  const aoListarTodasAsNotas = () => {
    enviarTag(null);
    listarSomenteArquivadas(false);
  }

  return (
    <nav className="left-panel">
  
      <img className="logo" src="assets/logo.svg" alt="Logo da aplicação." />

      <div className="buttons-container">
        <button onClick={aoListarTodasAsNotas}>
          <FontAwesomeIcon icon={faHouse} className="icon" />
          All Notes
        </button>

        <button onClick={() => listarSomenteArquivadas(true)}>
          <FontAwesomeIcon icon={faBoxArchive} className="icon" />
          Archived Notes
        </button>
      </div>

      <div className="tags-container">
        <span className="tag">Tags</span>
   
        {tags.map(tag => (
          <button key={tag.id} onClick={() => enviarTag(tag.name)}>
            <FontAwesomeIcon icon={faTag} className="icon" />
            {tag.name}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default LeftPanel;

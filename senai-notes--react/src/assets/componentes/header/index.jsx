import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./style.css";

function Header() {
  
  const [isDropdownVisible, setDropdownVisible] = useState(false);

 
  const onLogoutClick = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <nav className="page__content__header">
      <div className="left">
        <p>All Notes</p>
      </div>

      <div className="right">
        
        <div
          className="user__menu"
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <button>
            <FontAwesomeIcon icon={faUser} className="icon" />
          </button>

          {isDropdownVisible && (
            <div className="dropdown">
              <ul>
                
                <li onClick={onLogoutClick}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;

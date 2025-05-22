import Login from './Pages/login/index';
import NewUser from './Pages/new-user/index';
import Notes from './Pages/notes/index';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  
  const isAuthenticated = () => {

    let token = localStorage.getItem("token");

    if (token) {
      return true;
    } else {
      return false;
    }

  }

  return (
    <>
      <BrowserRouter>
      
        <Routes>

          <Route path="/" element={<Login/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/new-user" element={<NewUser/>}></Route>
          <Route path="/notes" element={isAuthenticated() == true ? <Notes/> : <h1>Not Found</h1>}></Route>

          <Route path="*" element={<h1>Not Found</h1>}></Route>

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import App from './App.jsx'
import "./assets/styles/global.css";
import "./assets/componentes/left-panel/style.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position='bottom-right' />
  </StrictMode>
)

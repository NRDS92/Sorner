import {BrowserRouter} from "react-router-dom"
import { createRoot } from 'react-dom/client'


import './index.css'
import App from './App.jsx'
import SornerContextProvider from "./context/SornerContext.jsx"

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <SornerContextProvider>
      <App />
    </SornerContextProvider>
  </BrowserRouter>,
)

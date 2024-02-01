import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NightModeProvider } from './components/Nightmode/NightModeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NightModeProvider>
      <App />
    </NightModeProvider>
  </BrowserRouter>
  
)

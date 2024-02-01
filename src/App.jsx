import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import TechnicianPortal from './components/Technician/TechnicianPortal.jsx'
import './index.css';
import Administrator from './components/Administrator/Administrator.jsx'
import Login from './components/Login/Login.jsx'
import TicketCreate from './components/TicketCreate/TicketCreate.jsx'
import { SupabaseProvider } from './SupabaseContext'
import Landing from './components/Landing/Landing.jsx'
import NightModeToggle from './components/Nightmode/NightModeToggle.jsx';
import { NightModeProvider, useNightMode } from './components/Nightmode/NightModeContext.jsx';

function App() {
  const { isNightMode } = useNightMode();
    if (isNightMode) {
      document.body.style.backgroundColor = '#1a1a1a';

    } else {
      document.body.style.backgroundColor = '#f1eee6';

    }


  return (
      <div className='App'>
        {/* <p>Powered by:</p> */}
        {/* <img className="appLogo" src="../img/sparksoftlogo.svg"/> */}
        <NightModeToggle />
        {/* Routes for pages */}
        <SupabaseProvider>
        <Routes>
          <Route path='/' element= { <Login/> } />
          <Route path='about' element= { <About /> } /> 
          <Route path='contact' element={ <Contact/> } />
          <Route path='technician' element={ <TechnicianPortal /> } />
          <Route path='administrator' element={ <Administrator /> } />
          <Route path='login' element={ <Login /> } />
          <Route path='ticketCreate' element={ <TicketCreate /> } />
          <Route path='landing' element={ <Landing /> } />
        </Routes>
        </SupabaseProvider>
      </div>
  )
}

export default App

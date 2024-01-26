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

function App() {

  return (
    <div className='App'>
      <p>Powered by:</p>
      <img className="appLogo" src="../img/sparksoftlogo.svg"/>
      
      {/* Routes for pages */}
      <SupabaseProvider>
      <Routes>
        <Route path='/' element= { <Home/> } />
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

import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login/Login.jsx'
import TicketCreate from './components/TicketCreate/TicketCreate.jsx'
function App() {

  return (
    <div className='App'>
      <h1>SparkinSoftware</h1>
      
      {/* Routes for pages */}
      <Routes>
        <Route path='/' element= { <Home/> } />
        <Route path='about' element= { <About /> } /> 
        <Route path='contact' element={ <Contact/> } />
        <Route path='login' element={ <Login /> } />
        <Route path='ticketCreate' element={ <TicketCreate /> } />
      </Routes>
      

    </div>
  )
}

export default App

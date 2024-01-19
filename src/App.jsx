import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Technician from './components/Technician'


function App() {

  return (
    <div className='App'>
      <h1>SparkinSoftware</h1>
      
      {/* Routes for pages */}
      <Routes>
        <Route path='/' element= { <Home/> } />
        <Route path='about' element= { <About /> } /> 
        <Route path='contact' element={ <Contact/> } />
      </Routes>
      

    </div>
  )
}

export default App

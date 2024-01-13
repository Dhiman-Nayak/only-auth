import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Profile from './pages/Profile'




function App() {

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      {/* <Route path='/about' element={<Home />} /> */}
      <Route path='/sign-in' element={<Signin />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/profile' element={<Profile />} />


    </Routes>
  
  </BrowserRouter>
}

export default App

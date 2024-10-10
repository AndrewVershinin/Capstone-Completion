import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Exercises from './components/Exercises/Exercises';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/exercises' element={<Exercises />}/>
          <Route path='/register' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

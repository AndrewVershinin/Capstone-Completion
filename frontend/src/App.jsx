import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddExercise from './components/Exercises/AddExercise';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/exercises' element={<AddExercise />}/>
          <Route path='/register' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/profile' element={<Profile />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

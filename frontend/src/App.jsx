import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';
import ExerciseManager from './components/Exercises/ExerciseManager';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/exercises' element={<ExerciseManager />}/>
          <Route path='/register' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/profile' element={<Profile />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

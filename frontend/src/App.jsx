import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';
import ExerciseManager from './components/Exercises/ExerciseManager';
import WorkoutManager from './components/Workouts/WorkoutManager';
import Navbar from './components/Navbar/Navbar';

function App() {


  return (
    <>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/exercises" element={<ExerciseManager />} />
        <Route path="/workouts" element={<WorkoutManager />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

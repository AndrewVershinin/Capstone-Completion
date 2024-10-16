import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';
import ExerciseManager from './components/Exercises/ExerciseManager';
import WorkoutManager from './components/Workouts/WorkoutManager';
import Navbar from './components/Navbar/Navbar';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update state based on token presence
  }, []);

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/exercises" element={<ExerciseManager />} />
          <Route path="/workouts" element={<WorkoutManager />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

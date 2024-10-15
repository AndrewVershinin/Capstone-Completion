import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        // if (token) {
        //     setIsLoggedIn(true);
        // } else {
        //     setIsLoggedIn(false);
        // }
        setIsLoggedIn(!!token); // !! (Double Bang): This is a JavaScript trick used to convert any value to a boolean and if !!token is true is a non-empty string
    }, []);

    

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h1>Workout Mate</h1>
            <div className="links">
                {isLoggedIn ? (
                    <>
                        <Link to="/exercises">Exercises</Link>
                        <Link to="/workouts">Workouts</Link>
                        <Link to="/profile">Profile</Link>
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
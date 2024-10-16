import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        // if (token) {
        //     setIsLoggedIn(true);
        // } else {
        //     setIsLoggedIn(false);
        // }
        setIsLoggedIn(!!token); // !! (Double Bang): This is a JavaScript trick used to convert any value to a boolean and if !!token is true is a non-empty string
    }, [setIsLoggedIn]);



    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div className={styles.navbarBox}>
            <h1>Your Workout mate</h1>
            <nav className={styles.navbar}>
                <div className={styles.links}>
                    {isLoggedIn ? (
                        <>  
                            <Link to="/profile">Profile</Link>
                            <Link to="/exercises">Exercises</Link>
                            <Link to="/workouts">Workouts</Link>
                            <button onClick={handleLogout} className={styles.logoutBtn}>
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
        </div>
    );
};

export default Navbar;
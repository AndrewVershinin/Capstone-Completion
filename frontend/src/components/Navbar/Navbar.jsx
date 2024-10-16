import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

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
    }, [isLoggedIn]);



    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <div>
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
import React, { useState } from 'react';
import { registerUser } from '../../services/api';
import { useNavigate } from "react-router-dom";
import styles from './Auth.module.css';


const SignUp = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userData = { email, password, displayName };
            const response = await registerUser(userData);

            if (response.token) {
                localStorage.setItem('token', response.token); // Store the JWT token in localStorage
                console.log('User registered successfully!');
                setIsLoggedIn(true);
                navigate('/profile');
            } else {
                console.error('Error: No token returned from backend');
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className={styles.signUp}>
            <h2>Sign up</h2>
            <form onSubmit={handleSignUp} className={styles.signUpForm}>
                <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder='Your name'
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Set Password"
                    required />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default SignUp;
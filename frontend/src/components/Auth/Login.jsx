import React, { useState } from "react";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import styles from './Auth.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = { email, password };
            const response = await loginUser(userData);

            if (response.token) {
                localStorage.setItem('token', response.token); // Store the JWT token
                navigate('/profile'); 
            } else {
                setError('Login failed: No token returned.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error logging in.');
        }
    };

    return (
        <div className={styles.login}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <input
                    type="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
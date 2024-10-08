import React, { useState } from 'react';
import { registerUser } from '../../services/api';
import { useNavigate } from "react-router-dom";


const SignUp = () => {
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
                localStorage.setItem('token', response.token);


                setTimeout(() => {
                    navigate('/profile'); 
                }, 1000);

            } else {
                console.error('Error: No token returned from backend');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div>
            <h2>Sign up</h2>
            <form onSubmit={handleSignUp}>
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
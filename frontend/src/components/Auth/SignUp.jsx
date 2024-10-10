import React, { useState } from 'react';
import { registerUser } from '../../services/api';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userData = { email, password, displayName };
            const response = await registerUser(userData); // Call the API to register user
            setSuccess('User registered successfully!');
        } catch (error) {
            console.error('Error registering user:', error);
            setSuccess('');
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
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default SignUp;
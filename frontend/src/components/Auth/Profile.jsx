import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services/api";
import { useNavigate } from "react-router-dom";



const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const fetchProfile = async () => {
                try {
                    const profile = await getUserProfile(token); // Pass the token and user ID
                    setUser(profile);
                } catch (error) {
                    setError('Failed to load user profile.');
                }
            };
            fetchProfile();
        }
    }, [navigate]);


    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        navigate('/login'); 
    };

    return (
        <div>
            <h2>Profile</h2>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.displayName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button onClick={handleLogout}>Log Out</button>
                </div>
            ) : (
                <p>{error ? error : 'No user data found.'}</p>

            )}
        </div>
    );
};

export default Profile;
import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services/api";
import { auth } from "../../firebaseClient";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token from localStorage:", token);
        if (!token) {
            navigate('/login');
        } else {
            const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                    const uid = firebaseUser.uid;
                    console.log("Current Firebase UID:", uid);
                    try {
                        const profile = await getUserProfile(uid, token);
                        console.log("Fetched profile for UID:", uid);
                        setUser(profile);
                    } catch (error) {
                        console.error('Error fetching user profile:', error);
                        setError('Failed to load user profile.');
                    }
                } else {
                    navigate('/login');
                }
            });
            // Cleanup function to unsubscribe when the component unmounts
            return () => unsubscribe(); 
        }
    }, [navigate]);

    // Handle logout
    const handleLogout = async () => {
        try {
            await auth.signOut();
            localStorage.removeItem('token');
            navigate('/login')
        } catch (error) {
            console.error('Error logging out: ', error)
            setError('Failed to log out.');
        }
    }

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
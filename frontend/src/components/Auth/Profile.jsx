import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services/api";
import { auth } from "../../firebaseClient";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    return (
        <div>
            
        </div>
    );
};

export default Profile;
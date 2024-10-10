import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

const firebaseConfig = {
    apiKey: "AIzaSyCUuIAn29GdMTVKsOpjkbW2sb0t3CU7K7Q",
    authDomain: "workout-mate-f9757.firebaseapp.com",
    projectId: "workout-mate-f9757",
    storageBucket: "workout-mate-f9757.appspot.com",
    messagingSenderId: "762930606109",
    appId: "1:762930606109:web:c4c68f9108df55690e56f4"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export the `auth` object
export const auth = getAuth(app);


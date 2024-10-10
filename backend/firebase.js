import admin from 'firebase-admin';
import serviceAccount from './config/workout-mate-f9757-firebase-adminsdk-uziqa-21229da175.json' assert { type: 'json' };

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://workout-mate-f9757.firebaseio.com"
});

// Export the auth instance for use in controllers
export const auth = admin.auth();
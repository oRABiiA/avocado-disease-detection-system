// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmzM4m5Q3egfRWDjL39leO9ra8NbsY9lM",
    authDomain: "avotech-eb2b8.firebaseapp.com",
    databaseURL: "https://avotech-eb2b8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "avotech-eb2b8",
    storageBucket: "avotech-eb2b8.firebasestorage.app",
    messagingSenderId: "397561235522",
    appId: "1:397561235522:web:bf3859a5f860e2db2445db",
    measurementId: "G-VPSKTZJRLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export const auth = getAuth(app);

export { database };
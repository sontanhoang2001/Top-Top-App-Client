// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCJ99RGiXI4FNzG0uoZ6dQX3go0hocNBy8',
    authDomain: 'toptop-app-4694f.firebaseapp.com',
    projectId: 'toptop-app-4694f',
    storageBucket: 'toptop-app-4694f.appspot.com',
    messagingSenderId: '983641027903',
    appId: '1:983641027903:web:dd2c6d6fa7b0cd76434f8a',
    measurementId: 'G-HLTYWEBRWR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// do not share config publicly

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCusVbfHLU6qLn2zgyQ2clgLYWZugKXKCg",
  authDomain: "explore-email-password-a-245ff.firebaseapp.com",
  projectId: "explore-email-password-a-245ff",
  storageBucket: "explore-email-password-a-245ff.firebasestorage.app",
  messagingSenderId: "1088766769415",
  appId: "1:1088766769415:web:d414ce755d3c9acba1ada2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
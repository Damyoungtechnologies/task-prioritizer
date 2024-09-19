// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBgeibr29L__ulDx4aklibLdCPBgIdRYPM",
  authDomain: "task-prioritizer-app.firebaseapp.com",
  projectId: "task-prioritizer-app",
  storageBucket: "task-prioritizer-app.appspot.com",
  messagingSenderId: "537315974363",
  appId: "1:537315974363:web:ec67f758507c09afea40fe",
  measurementId: "G-J8HZDNWPLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
export {app, auth};
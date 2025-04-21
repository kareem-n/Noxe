// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth' ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoKa5J3DzAfIahVPBaApoBjD6IwUXwm0k",
  authDomain: "noxelogin.firebaseapp.com",
  projectId: "noxelogin",
  storageBucket: "noxelogin.firebasestorage.app",
  messagingSenderId: "138303641168",
  appId: "1:138303641168:web:4a473fce085b953701e355"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) ;
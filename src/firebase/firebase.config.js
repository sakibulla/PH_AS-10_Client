// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkngI94KwMW2XWtdJBR6NEp7eBtdtrIZI",
  authDomain: "artify-b3107.firebaseapp.com",
  projectId: "artify-b3107",
  storageBucket: "artify-b3107.firebasestorage.app",
  messagingSenderId: "700089158245",
  appId: "1:700089158245:web:163e7b892aa31f39bc948c",
  measurementId: "G-0CW0HCZYYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
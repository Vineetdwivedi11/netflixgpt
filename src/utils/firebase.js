// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkOSLjJQaAmGmtACRiylWpuP-mYmJReTI",
  authDomain: "netflixgpt-fd455.firebaseapp.com",
  projectId: "netflixgpt-fd455",
  storageBucket: "netflixgpt-fd455.appspot.com",
  messagingSenderId: "621909241357",
  appId: "1:621909241357:web:273441cf4155189171ef44",
  measurementId: "G-JCT6PM7J37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// import firebase from "firebase";
// This is the technique we will going to call the firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw7hbZ92wNVw8rX-ytqVazS26jm0wqkL0",
  authDomain: "fir-75e60.firebaseapp.com",
  projectId: "fir-75e60",
  storageBucket: "fir-75e60.appspot.com",
  messagingSenderId: "700116461306",
  appId: "1:700116461306:web:c53b9ac46463615cde4b43",
  measurementId: "G-NY9WGN7KNC",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;

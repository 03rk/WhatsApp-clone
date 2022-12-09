import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7qUsB_1HRmt6AjnSX4tn8xq_9kV7kttk",
  authDomain: "whatsapp-clone-0303.firebaseapp.com",
  projectId: "whatsapp-clone-0303",
  storageBucket: "whatsapp-clone-0303.appspot.com",
  messagingSenderId: "719251945204",
  appId: "1:719251945204:web:ea367be627164c079ad0a1",
  measurementId: "G-PH4WN3H9LG",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;

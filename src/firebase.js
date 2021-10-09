import firebase from "firebase/app";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAYlU0OGRniQWQ8_qrmvj5IYGr3TwhopzQ",
  authDomain: "murtazaasghar-7f499.firebaseapp.com",
  projectId: "murtazaasghar-7f499",
  storageBucket: "murtazaasghar-7f499.appspot.com",
  messagingSenderId: "1025157248237",
  appId: "1:1025157248237:web:19d8ebd073b0382bf188e4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

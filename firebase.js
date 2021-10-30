import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCb7abMrXTTUuk0hU_WiLBYwc_zipyR3-c",
  authDomain: "to-do-reactnative-4ef5b.firebaseapp.com",
  projectId: "to-do-reactnative-4ef5b",
  storageBucket: "to-do-reactnative-4ef5b.appspot.com",
  messagingSenderId: "1040176017906",
  appId: "1:1040176017906:web:69d7810256d9a39ea23b6b",
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { firebase, db };

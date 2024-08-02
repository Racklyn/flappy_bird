// import firebase from 'firebase/app';
// import 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// import 'firebase/auth';

// import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyBviOc2DHWuosFSkZN1MTRXODRZenuZOAQ",
  authDomain: "flappy-bird-75ddb.firebaseapp.com",
  projectId: "flappy-bird-75ddb",
  storageBucket: "flappy-bird-75ddb.appspot.com",
  messagingSenderId: "316229551103",
  appId: "1:316229551103:web:a0df558fe5276a19a31dca"
});

// const auth = firebase.auth();
const firestore = firebase.firestore();

export default firestore;
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAzx7abRfQmIalbZsXWt-SS0vh441bVfTY',
  authDomain: 'multiverse-karthick.firebaseapp.com',
  projectId: 'multiverse-karthick',
  storageBucket: 'multiverse-karthick.appspot.com',
  messagingSenderId: '219892933631',
  appId: '1:219892933631:web:ba1f580889992dfccbbdca',
  measurementId: 'G-FLFXT3TGLJ',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

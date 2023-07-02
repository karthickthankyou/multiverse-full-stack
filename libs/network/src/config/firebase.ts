import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAzx7abRfQmIalbZsXWt-SS0vh441bVfTY',
  authDomain: 'multiverse-karthick.firebaseapp.com',
  projectId: 'multiverse-karthick',
  storageBucket: 'multiverse-karthick.appspot.com',
  messagingSenderId: '219892933631',
  appId: '1:219892933631:web:ba1f580889992dfccbbdca',
  measurementId: 'G-FLFXT3TGLJ',
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
// const analytics = getAnalytics(firebaseApp)
export const db = getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)

export const auth = getAuth(firebaseApp)

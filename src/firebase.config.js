import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7IDQhhWUUfzljmpsMuRGp3sP3lLQsRgc",
    authDomain: "house-market-place-app-5bdf1.firebaseapp.com",
    projectId: "house-market-place-app-5bdf1",
    storageBucket: "house-market-place-app-5bdf1.appspot.com",
    messagingSenderId: "994537414805",
    appId: "1:994537414805:web:17a1703b35ff899e457b9c"
  };

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
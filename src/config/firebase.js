import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAykzUcH1_nYnAXzcxSkQZ0a35QsNwlg_k",
    authDomain: "fir-11424.firebaseapp.com",
    projectId: "fir-11424",
    storageBucket: "fir-11424.firebasestorage.app",
    messagingSenderId: "932152089005",
    appId: "1:932152089005:web:788e39235cf4725519e924",
    measurementId: "G-T1TXY4BNCJ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
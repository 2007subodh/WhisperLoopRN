// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDF0LsHZBcg2ui49ga4Ngt8rES2XWZQfZ4",
  authDomain: "whisperloop-ee6e9.firebaseapp.com",
  databaseURL: "https://whisperloop-ee6e9-default-rtdb.firebaseio.com",
  projectId: "whisperloop-ee6e9",
  storageBucket: "whisperloop-ee6e9.appspot.com", // ← fix typo: should be .appspot.com
  messagingSenderId: "1024740287397",
  appId: "1:1024740287397:web:339ff1ea193f845204fe4c",
  measurementId: "G-G9MESH6GDK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth'; // rimosso per compatibilità Expo

const firebaseConfig = {
  apiKey: "AIzaSyCPvBRq42naZ0Y2m6LUXZTQ966c4rY4NIk",
  authDomain: "costafoto-9262f.firebaseapp.com",
  projectId: "costafoto-9262f",
  storageBucket: "costafoto-9262f.firebasestorage.app",
  messagingSenderId: "424327112581",
  appId: "1:424327112581:web:2359a74c8d09a2f25e86ec",
  measurementId: "G-V285Y4L68E"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const auth = getAuth(app);

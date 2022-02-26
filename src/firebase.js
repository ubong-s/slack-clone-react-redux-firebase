import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyAhYt5aG9BR3mqqTCJuuPZhAKgjvD1BzvY',
   authDomain: 'slack-clone-53227.firebaseapp.com',
   projectId: 'slack-clone-53227',
   storageBucket: 'slack-clone-53227.appspot.com',
   messagingSenderId: '894058117010',
   appId: '1:894058117010:web:d899bd22fbf26a23cd734b',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// initialize services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider, db };

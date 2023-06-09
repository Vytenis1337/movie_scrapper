import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCzZcBY2aeQNa1kgtdUfCE-JWyi7snk3Xo',
    authDomain: 'reflix-2023-vytenis.firebaseapp.com',
    projectId: 'reflix-2023-vytenis',
    storageBucket: 'reflix-2023-vytenis.appspot.com',
    messagingSenderId: '1079875864091',
    appId: '1:1079875864091:web:78ffecec710e2bf47d9abe',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

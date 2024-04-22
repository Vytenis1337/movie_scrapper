import { initializeApp } from 'firebase/app';
import { NextOrObserver, User, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_DB_PASS,
    authDomain: 'reflix-2023-vytenis.firebaseapp.com',
    projectId: 'reflix-2023-vytenis',
    storageBucket: 'reflix-2023-vytenis.appspot.com',
    messagingSenderId: '1079875864091',
    appId: '1:1079875864091:web:78ffecec710e2bf47d9abe',
};

console.log(process.env.NEXT_PUBLIC_DB_PASS);

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const userStateListener = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback);
};

export const SignOutUser = async () => await signOut(auth);

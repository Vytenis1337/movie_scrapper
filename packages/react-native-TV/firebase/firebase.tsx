import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCzZcBY2aeQNa1kgtdUfCE-JWyi7snk3Xo',
  authDomain: 'reflix-2023-vytenis.firebaseapp.com',
  databaseURL: 'https://reflix-2023-vytenis.firebaseio.com',
  projectId: 'reflix-2023-vytenis',
  storageBucket: 'reflix-2023-vytenis.appspot.com',
  messagingSenderId: '1079875864091',
  appId: '1:1079875864091:web:78ffecec710e2bf47d9abe',
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the auth and firestore services
export const auth = firebase.auth();
export const db = firebase.firestore();

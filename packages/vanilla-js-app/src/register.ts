import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/firebase';

const registerEmail: any = document.getElementById('register-email');
const registerPassword: any = document.getElementById('register-password');

// Get the login form element
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const registerEmailValue = registerEmail?.value;
    const registerPasswordValue = registerPassword?.value;

    createUserWithEmailAndPassword(auth, registerEmailValue, registerPasswordValue)
        .then((userCredential) => {
            // Signed in
            console.log('user register:', userCredential);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
});

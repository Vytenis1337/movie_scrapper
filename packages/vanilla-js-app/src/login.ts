import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase/firebase';

const emailInput: any = document.getElementById('email');
const passwordInput: any = document.getElementById('password');

// Get the login form element
const loginForm = document.getElementById('login-form');

// Add an event listener to the login form submit event
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting and page refresh

    const email = emailInput?.value;
    const password = passwordInput?.value;

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: { user: any }) => {
            // User signed in successfully

            localStorage.setItem('currentUser', JSON.stringify(userCredential.user.email));
            localStorage.setItem('currentUserId', JSON.stringify(userCredential.user.uid));
            console.log(userCredential);
            const user = userCredential.user;
            console.log('User logged in:', user);
            // Redirect or perform other actions on successful login
        })
        .catch((error: { code: any; message: any }) => {
            // Handle login errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Login error:', errorCode, errorMessage);
        });
});

const logOut = document.getElementById('logout');

logOut.addEventListener('click', (e) => {
    try {
        auth.signOut().then(() => {
            console.log('Signed Out');
            localStorage.setItem('currentUser', null!);
            localStorage.setItem('currentUserId', null!);
        });
    } catch (error) {
        console.error('Sign Out Error', error);
    }
});

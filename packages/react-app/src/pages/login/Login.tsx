import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navitage = useNavigate();

    const handleLogin = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(e);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                localStorage.setItem('currentUser', JSON.stringify(userCredential.user.email));

                console.log(userCredential.user);

                navitage('/');
            })
            .catch((error) => {});
    };

    const goToRegister = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    };

    return (
        <div>
            <form className="login-form">
                <p className="login-form-title">
                    {' '}
                    <span>Login</span>
                    Form
                </p>
                <p className="login-form-req">Register or Login to see Todo List!</p>
                <input
                    className="login-input"
                    type="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" onClick={handleLogin} className="login-button">
                    Login
                </button>
                <button type="button" onClick={goToRegister} className="goToRegister-button">
                    Go to Register
                </button>
                {/* {error && <span className='main-span'>Wrong email or password!</span>} */}
            </form>
        </div>
    );
};

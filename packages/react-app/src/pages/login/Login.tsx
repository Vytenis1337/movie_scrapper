import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navitage = useNavigate();

    const handleLogin = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(e);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                localStorage.setItem('currentUser', JSON.stringify(userCredential.user.email));
                localStorage.setItem('currentUserId', JSON.stringify(userCredential.user.uid));

                navitage('/movies');
            })
            .catch((error) => {
                setError(error.response.data);
            });
    };

    const goToRegister = (e: { preventDefault: () => void }) => {
        e.preventDefault();
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <h1 className="login-h1">Login</h1>
                <label className="login-label" htmlFor="">
                    Email
                </label>
                <input
                    className="login-input"
                    name="email"
                    type="email"
                    placeholder="user@user.com"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className="login-label" htmlFor="">
                    Password
                </label>
                <input
                    className="login-input"
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" type="submit">
                    Login
                </button>
                {error && error}
                <p>
                    Don't have an account yet?{' '}
                    <Link to="/register">
                        <span>Register</span>
                    </Link>
                </p>
            </form>
        </div>
    );
};

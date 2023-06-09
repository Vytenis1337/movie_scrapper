'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/utils/firebase';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(e);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                localStorage.setItem('currentUser', JSON.stringify(userCredential.user.email));
                localStorage.setItem('currentUserId', JSON.stringify(userCredential.user.uid));
            })
            .catch((error) => {
                console.log('error:', error);
            });
    };

    return (
        <div className={styles.login_page}>
            <form className={styles.login_form} onSubmit={handleLogin}>
                <h1 className={styles.login_h1}>Login</h1>
                <label className={styles.login_label} htmlFor="">
                    Email
                </label>
                <input
                    className={styles.login_input}
                    name="email"
                    type="email"
                    placeholder="user@user.com"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label className={styles.login_label} htmlFor="">
                    Password
                </label>
                <input
                    className={styles.login_input}
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.login_button} type="submit">
                    Login
                </button>
                {/* {error && error} */}
                <p>
                    Don't have an account yet?{' '}
                    <Link as="/register" href="/register">
                        <span>Register</span>
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;

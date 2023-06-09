'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/utils/firebase';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Register Page',
    description: 'This is the Register Page',
};

const Register = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [err, setError] = useState(null);

    const handleRegister = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then((userCredential) => {
                console.log(userCredential);
            });
        } catch (error: any) {
            setError(error.response.data);
        }
    };
    return (
        <div className={styles.auth}>
            <form className={styles.auth_form}>
                <h1 className={styles.auth_h1}>Register</h1>

                <label className={styles.auth_label} htmlFor="">
                    Email
                </label>
                <input
                    className={styles.auth_input}
                    required
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />

                <label className={styles.auth_label} htmlFor="">
                    Password
                </label>
                <input
                    className={styles.auth_input}
                    required
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <button className={styles.auth_button} onClick={handleRegister}>
                    Register
                </button>

                <p>
                    Do you have an account?{' '}
                    <Link href="/login" as="/login">
                        <span>Login</span>
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;

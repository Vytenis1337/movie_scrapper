'use client';

import Link from 'next/link';

import styles from './page.module.css';
import { useContext } from 'react';
import { AuthContext } from 'src/providers/auth-context-provider';

const HomeNavigationButton = () => {
    const { currentUser, signOut } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            signOut();
        } catch (error) {
            console.error('Sign Out Error', error);
        }
    };
    return (
        <Link as="/login" href="/login">
            {currentUser ? (
                <button className={styles.home_button} onClick={handleLogout}>
                    LogOut
                </button>
            ) : (
                <button className={styles.home_button}>
                    {' '}
                    <span>Login</span>
                </button>
            )}
        </Link>
    );
};

export default HomeNavigationButton;

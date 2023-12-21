'use client';

import Link from 'next/link';
import { Dispatch, SetStateAction, useContext } from 'react';
import { AuthContext } from 'src/providers/auth-context-provider';
import styles from './page.module.css';

type UserNavProps = {
    setIsNavExpanded: Dispatch<SetStateAction<boolean>>;
    isNavExpanded: boolean;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

const UserNav = ({ open, setOpen, setIsNavExpanded, isNavExpanded }: UserNavProps) => {
    const { currentUser, signOut } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            signOut();
        } catch (error) {
            console.error('Sign Out Error', error);
        }
    };

    return (
        <>
            {currentUser ? (
                <div
                    className={isNavExpanded ? styles.navbar_login : styles.navbar_login_closed}
                    onClick={() => setOpen(!open)}
                >
                    <div className={styles.username}>{currentUser.email?.substring(0, 1)}</div>
                    {open && (
                        <div className={styles.user_options} onClick={handleLogout}>
                            Logout
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Link
                        as="/login"
                        href={"/login"}
                        className={isNavExpanded ? styles.navbar_menu_link : styles.navbar_menu_link_closed}
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded);
                        }}
                    >
                        Sign in
                    </Link>
                </>
            )}
        </>
    );
};

export default UserNav;

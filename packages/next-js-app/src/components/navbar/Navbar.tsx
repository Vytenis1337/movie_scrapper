'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import styles from './page.module.css';
// import newRequest from '../../utils/newRequest';

import { FaCity } from 'react-icons/fa';
import { Toaster, toast } from 'sonner';
import LibraryNav from './libraryNav/LibraryNav';
import UserNav from './userNav/UserNav';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { AuthContext } from 'src/providers/auth-context-provider';
// import { useQuery } from '@tanstack/react-query';
// import { mobileSocialIcons } from '../../utils/socialIcons';
// import { SocialIcon } from '../SocialIcon/SocialIcon';

// import { useOutsideClick } from '../../hooks/useOutsideClick';
// import { useEscapeKey } from '../../hooks/useEscapeKey';

const Navbar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);
    // const currentUser = JSON.parse(localStorage?.getItem('currentUser') as string);

    // const handleCloseLogin = () => setOpen(false);
    // const handleCloseMenu = () => setIsNavExpanded(false);

    //   useOutsideClick(handleCloseLogin, modalRef);
    //   useOutsideClick(handleCloseMenu, mobileRef);

    //   useEscapeKey(handleCloseLogin);

    return (
        <div className={styles.navbar}>
            {isNavExpanded ? (
                <button
                    className={styles.hamburger}
                    onClick={() => {
                        setIsNavExpanded(!isNavExpanded);
                    }}
                >
                    <CloseIcon boxSize={6} />
                </button>
            ) : (
                <button
                    className={styles.hamburger}
                    onClick={() => {
                        setIsNavExpanded(!isNavExpanded);
                    }}
                >
                    <HamburgerIcon boxSize={8} />
                </button>
            )}
            <div className={styles.navbar_menu}>
                <Link href="/" as="/" className={styles.navbar_logo}>
                    <FaCity size={50} />
                </Link>
                <div className={isNavExpanded ? styles.navbar_links : styles.navbar_links_closed}>
                    <Link
                        className={isNavExpanded ? styles.navbar_menu_link : styles.navbar_menu_link_closed}
                        as="/movies"
                        href="/movies"
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded);
                        }}
                    >
                        Movies
                    </Link>
                    <Link
                        className={isNavExpanded ? styles.navbar_menu_link : styles.navbar_menu_link_closed}
                        href={currentUser === null ? '/login' : '/library'}
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded);
                            if (!currentUser) {
                                // Show toaster
                                toast.error(`To use Library, You need to Login first`);
                            }
                        }}
                    >
                        <LibraryNav />
                    </Link>

                    <Link
                        className={isNavExpanded ? styles.navbar_menu_link : styles.navbar_menu_link_closed}
                        href="/contacts"
                        onClick={() => {
                            setIsNavExpanded(!isNavExpanded);
                        }}
                    >
                        Contacts
                    </Link>
                    <UserNav
                        open={open}
                        setOpen={setOpen}
                        isNavExpanded={isNavExpanded}
                        setIsNavExpanded={setIsNavExpanded}
                    />
                </div>

                {/* <div
            className={
              isNavExpanded ? 'mobile-socialIcons' : 'navbar-socialIcons'
            }
          >
            {mobileSocialIcons.map((item: any) => {
              return <SocialIcon key={item.id} {...item} />;
            })}
          </div> */}
            </div>
        </div>
    );
};

export default Navbar;

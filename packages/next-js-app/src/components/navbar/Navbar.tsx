'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { useState } from 'react';
// import newRequest from '../../utils/newRequest';

import { FaCity } from 'react-icons/fa';
import { auth } from 'src/utils/firebase';
// import { useQuery } from '@tanstack/react-query';
// import { mobileSocialIcons } from '../../utils/socialIcons';
// import { SocialIcon } from '../SocialIcon/SocialIcon';

// import { useOutsideClick } from '../../hooks/useOutsideClick';
// import { useEscapeKey } from '../../hooks/useEscapeKey';

const Navbar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const currentUser = JSON.parse(localStorage?.getItem('currentUser') as string);

    //   const { data, refetch } = useQuery({
    //     queryKey: ['myMovies'],
    //     queryFn: () =>
    //       newRequest.get(`/movies?userId=${currentUser._id}`).then((res) => {
    //         return res.data;
    //       }),
    //   });

    //   useEffect(() => {
    //     refetch();
    //   }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleLogout = async () => {
        try {
            auth.signOut().then(() => {
                console.log('Signed Out');
                localStorage.setItem('currentUser', null!);
                localStorage.setItem('currentUserId', null!);
            });
        } catch (error) {
            console.error('Sign Out Error', error);
        }
    };
    // const handleCloseLogin = () => setOpen(false);
    // const handleCloseMenu = () => setIsNavExpanded(false);

    //   useOutsideClick(handleCloseLogin, modalRef);
    //   useOutsideClick(handleCloseMenu, mobileRef);

    //   useEscapeKey(handleCloseLogin);

    return (
        <div className={styles.navbar}>
            <Link href="/" as="/" className={styles.navbar_logo}>
                <FaCity size={50} />
            </Link>
            <button
                className={styles.hamburger}
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                }}
            ></button>
            <div className={isNavExpanded ? `${styles.navbar_menu} ${styles.expanded}` : styles.navbar_menu}>
                <ul>
                    <li>
                        <Link
                            className={styles.navbar_menu_link}
                            as="/movies"
                            href="/movies"
                            onClick={() => {
                                setIsNavExpanded(!isNavExpanded);
                            }}
                        >
                            Movies
                        </Link>
                    </li>

                    <li>
                        <Link
                            as="/library"
                            className={styles.navbar_menu_library_link}
                            href={currentUser ? '/library' : '/login'}
                            onClick={() => {
                                setIsNavExpanded(!isNavExpanded);
                            }}
                        >
                            Library
                            <div className={styles.navbar_library_count}>
                                <div className={styles.navbar_library_count_number}>{/* {data?.length} */}</div>
                            </div>
                        </Link>
                    </li>

                    {/* <li>
                        <Link
                            className="navbar-menu-link"
                            to="/contacts"
                            onClick={() => {
                                setIsNavExpanded(!isNavExpanded);
                            }}
                        >
                            Contacts
                        </Link>
                    </li> */}

                    <>
                        {currentUser ? (
                            <div className={styles.navbar_login} onClick={() => setOpen(!open)}>
                                <div className={styles.username}>{currentUser?.substring(0, 1)}</div>
                                {open && (
                                    <div className={styles.user_options} onClick={handleLogout}>
                                        Logout
                                    </div>
                                )}
                            </div>
                        ) : (
                            <li>
                                <Link
                                    as="/login"
                                    href="/login"
                                    className={styles.navbar_menu_link}
                                    onClick={() => {
                                        setIsNavExpanded(!isNavExpanded);
                                    }}
                                >
                                    Sign in
                                </Link>
                            </li>
                        )}
                    </>
                    {/* <div
            className={
              isNavExpanded ? 'mobile-socialIcons' : 'navbar-socialIcons'
            }
          >
            {mobileSocialIcons.map((item: any) => {
              return <SocialIcon key={item.id} {...item} />;
            })}
          </div> */}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;

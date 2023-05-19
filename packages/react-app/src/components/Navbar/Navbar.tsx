import './Navbar.css';
import { useEffect, useState } from 'react';
// import newRequest from '../../utils/newRequest';
import { Link, useNavigate } from 'react-router-dom';
import { FaCity } from 'react-icons/fa';
// import { useQuery } from '@tanstack/react-query';
// import { mobileSocialIcons } from '../../utils/socialIcons';
// import { SocialIcon } from '../SocialIcon/SocialIcon';
import { useRef } from 'react';
// import { useOutsideClick } from '../../hooks/useOutsideClick';
// import { useEscapeKey } from '../../hooks/useEscapeKey';

export const Navbar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const [open, setOpen] = useState(false);

    const modalRef = useRef(null);
    const mobileRef = useRef(null);

    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

    const navigate = useNavigate();

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

    //   const handleLogout = async () => {
    //     try {
    //       await newRequest.post('/auth/logout');
    //       localStorage.setItem('currentUser', null!);

    //       navigate('/');
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    const handleCloseLogin = () => setOpen(false);
    const handleCloseMenu = () => setIsNavExpanded(false);

    //   useOutsideClick(handleCloseLogin, modalRef);
    //   useOutsideClick(handleCloseMenu, mobileRef);

    //   useEscapeKey(handleCloseLogin);

    return (
        <div className="navbar" ref={mobileRef}>
            <Link to="/" className="navbar-logo">
                <FaCity size={50} />
            </Link>
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                }}
            ></button>
            <div className={isNavExpanded ? 'navbar-menu expanded' : 'navbar-menu'}>
                <ul>
                    <li>
                        <Link
                            className="navbar-menu-link"
                            to="/movies"
                            onClick={() => {
                                setIsNavExpanded(!isNavExpanded);
                            }}
                        >
                            Movies
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="navbar-menu-library-link"
                            to={currentUser ? '/library' : '/login'}
                            onClick={() => {
                                setIsNavExpanded(!isNavExpanded);
                            }}
                        >
                            Library
                            <div className="navbar-library-count">
                                <div className="navbar-library-count-number">{/* {data?.length} */}</div>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="navbar-menu-link"
                            to="/contacts"
                            onClick={() => {
                                setIsNavExpanded(!isNavExpanded);
                            }}
                        >
                            Contacts
                        </Link>
                    </li>

                    <>
                        {currentUser ? (
                            <div className="navbar-login" onClick={() => setOpen(!open)}>
                                <div className="username">{currentUser}</div>
                                {open && (
                                    <div
                                        ref={modalRef}
                                        className="user-options"
                                        // onClick={handleLogout}
                                    >
                                        Logout
                                    </div>
                                )}
                            </div>
                        ) : (
                            <li>
                                <Link
                                    to="/login"
                                    className="navbar-menu-link"
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

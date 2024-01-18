'use client';

import Link from 'next/link';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { useFetchLibrary } from 'src/hooks/useFetchLibrary';
import { AuthContext } from 'src/providers/auth-context-provider';
import styles from './page.module.css';
import { Spinner } from '@chakra-ui/react';

// type LibraryNavProps = {
//     isNavExpanded: boolean;
// };

const LibraryNav = () => {
    const { currentUser } = useContext(AuthContext);
    const {
        isLoading,

        error,
        data,
        refetch,
    } = useFetchLibrary();

    console.log(currentUser);

    useEffect(() => {
        refetch();
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {error ? (
                'Error'
            ) : isLoading ? (
                <Spinner size="sm" />
            ) : (
                <>
                    <div className={styles.navbar_menu_library_link}>
                        Library
                        <div className={currentUser ? styles.navbar_library_count : styles.navbar_library_count_none}>
                            <div
                                className={
                                    currentUser ? styles.navbar_library_count_number : styles.navbar_library_count_none
                                }
                            >
                                {data.length}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default LibraryNav;

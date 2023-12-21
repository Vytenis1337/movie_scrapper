'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import newRequest from 'src/utils/newRequest';
import styles from './page.module.css';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import { LibraryCardProps } from 'src/app/movies/[id]/page';
import LibraryCard from '../libraryCard/LibraryCard';
import { useFetchLibrary } from 'src/app/hooks/useFetchLibrary';
import { Spinner } from '@chakra-ui/react';

const LibrarySection = () => {
    const { isLoading, isFetching, error, data } = useFetchLibrary();
    return (
        <>
            {error ? (
                <p>Oh no, there was an error</p>
            ) : isLoading || isFetching ? (
                <div className={styles.library_section}>
                    <Spinner margin="auto" size="xl" />
                </div>
            ) : data && data.length > 0 ? (
                <div className={styles.library_section}>
                    <div className={styles.library_top_section}>
                        <button className={styles.library_back_button}>
                            <Link as="/" href="/">
                                <BiArrowBack size={30} />
                            </Link>
                        </button>
                        <h1 className={styles.library_main_title}>My Library</h1>
                    </div>

                    <div className={styles.library_content}>
                        {data.map((item: LibraryCardProps) => (
                            <LibraryCard key={item._id} {...item} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className={styles.library_section}>
                    <div className={styles.empty_library}>
                        'Library is empty'
                        <p>
                            add{' '}
                            <Link href="/movies">
                                <span>Movies to the list.</span>
                            </Link>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default LibrarySection;

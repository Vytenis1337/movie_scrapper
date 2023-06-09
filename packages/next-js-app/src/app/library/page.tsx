'use client';

import styles from './page.module.css';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';
import { LibraryCardProps } from '../movies/[id]/page';
import LibraryCard from 'src/components/LibraryCard/LibraryCard';
import { useQuery } from '@tanstack/react-query';
import newRequest from 'src/utils/newRequest';
import { Metadata } from 'next';

// async function getData() {
//     const res = await fetch('http://localhost:3000/api/library');

//     if (!res.ok) {
//         throw new Error('Failed to fetch data');
//     }

//     return res.json();
// }

export const metadata: Metadata = {
    title: 'Library Page',
    description: 'This is the Library Page',
};

const Library = () => {
    // const data = await getData();

    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['myLibrary'],
        queryFn: () =>
            newRequest.get(`/library`).then((res: any) => {
                return res.data;
            }),
    });

    console.log(data);

    return (
        <div className={styles.library}>
            {error ? (
                <p>Oh no, there was an error</p>
            ) : isLoading || isFetching ? (
                <p>Loading...</p>
            ) : data ? (
                <div>
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
            ) : null}
        </div>
    );
};

export default Library;

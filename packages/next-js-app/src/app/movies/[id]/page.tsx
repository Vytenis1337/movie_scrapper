'use client';

import useSWR from 'swr';
import { BiArrowBack } from 'react-icons/bi';
import styles from './page.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from 'src/utils/newRequest';
import { useEffect } from 'react';

export type LibraryCardProps = {
    userId: number;
    movieId: number;
    _id: any;
    singleMovieId: any;
    title: string;
    posterUrl: string;
    videoUrl: string;
    summary: string;
    genres: [string];
    rating: number;
    year: number;
};

// const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

// async function getData(id: any) {
//     const res = await fetch(`http://localhost:3000/api/movies/${id}`);

//     if (!res.ok) {
//         return notFound();
//     }

//     return res.json();
// }

const SingleMovie = ({ params }: any) => {
    const { isLoading, isFetching, error, data, refetch } = useQuery({
        queryKey: ['singleMovie'],
        queryFn: () =>
            newRequest.get(`/movies/${params.id}`).then((res: any) => {
                return res.data;
            }),
    });

    console.log(data);

    const queryClient = useQueryClient();

    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    const currentUserId = JSON.parse(localStorage.getItem('currentUserId') as any);

    // const { data, error } = useSWR(`http://localhost:3000/api/movies/${params.id}`, fetcher);

    // if (error) return <div>Failed to load</div>;
    // if (!data) return <div>Loading...</div>;

    const mutation = useMutation({
        mutationFn: (data: LibraryCardProps) => {
            return newRequest.post(`/library`, {
                userId: currentUserId,
                title: data.title,
                posterUrl: data.posterUrl,
                videoUrl: data.videoUrl,
                summary: data.summary,
                year: data.year,
                movieId: data.movieId,
                rating: data.rating,
                genres: data.genres,
                singleMovieId: data._id,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myLibrary']);
        },
    });

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        // if (currentUser) {
        try {
            mutation.mutate(data);
            console.log('succesfully ');
        } catch (err) {
            console.log(err);
        }
    };
    // else {
    //     console.log('not success');
    // }

    // const handleClick = async (e: { preventDefault: () => void }) => {
    //     e.preventDefault();

    //     const userId = currentUserId;
    //     const title = data.title;
    //     const posterUrl = data.posterUrl;
    //     const videoUrl = data.videoUrl;
    //     const summary = data.summary;
    //     const year = data.year;
    //     const movieId = data.movieId;
    //     const rating = data.rating;
    //     const genres = data.genres;

    //     try {
    //         await fetch('http://localhost:3000/api/library', {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 userId,
    //                 title,
    //                 posterUrl,
    //                 videoUrl,
    //                 summary,
    //                 year,
    //                 movieId,
    //                 rating,
    //                 genres,
    //             }),
    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <div className={styles.single}>
            {error ? (
                <p>Oh no, there was an error</p>
            ) : isLoading || isFetching ? (
                <p>Loading...</p>
            ) : data ? (
                <div className={styles.single_content}>
                    <div className={styles.single_top}>
                        <button className={styles.back_button}>
                            <Link as="/movies" href="/movies">
                                <BiArrowBack size={30} />
                            </Link>
                        </button>
                        <div className={styles.single_title}>
                            <h1 className={styles.single_h1}>
                                {data.title}
                                {/* {state.title} */}
                            </h1>
                            <div className={styles.single_release}>
                                Release Date:
                                <span>
                                    {data.year}
                                    {/* {state.year} */}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.single_content_both_sides}>
                        <div className={styles.single_content_left_side}>
                            <img className={styles.single_img} src={`${data.posterUrl}`} alt={data.title} />
                            <div className={styles.single_rating}>
                                <div className={styles.single_movie_rating}>
                                    <span className={styles.single_movie_rating_span}>Movie Rating:</span>
                                    {data.rating}
                                    {/* {state.rating} */}
                                </div>
                            </div>
                        </div>
                        <div className={styles.single_description}>
                            <p className={styles.single_p}>
                                {data.summary}

                                {/* {state.summary} */}
                            </p>{' '}
                        </div>
                    </div>
                    <div className={styles.single_watch_library}>
                        <Link href={`/trailer/${data._id}`}>
                            <button className={styles.watch_button}>Watch Trailer</button>
                        </Link>

                        <button onClick={handleClick} className={styles.library_button}>
                            Add to Library
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default SingleMovie;

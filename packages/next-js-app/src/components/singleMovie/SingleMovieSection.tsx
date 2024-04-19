'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import { movieSchema } from 'src/lib/validators/movie-validator';
import newRequest from 'src/utils/newRequest';
import LibraryButton from './libraryButton/LibraryButton';
import styles from './page.module.css';
import { Button, Center, Divider, Spinner } from '@chakra-ui/react';
import WatchTrailerModal from './trailerModal/TrailerModal';
import { useState } from 'react';

type PageProps = {
    params: {
        id: string;
    };
};

const SingleMovieSection = ({ params }: PageProps) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    console.log(params.id);
    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['singleMovie'],
        queryFn: () =>
            newRequest.get(`/movies/${params.id}`).then((res) => {
                const result = movieSchema.safeParse(res.data);
                if (result.success) {
                    return result.data;
                } else {
                    // Handle or throw error
                    throw new Error('Invalid data');
                }
            }),
    });

    console.log(data);

    return (
        <>
            {error ? (
                <p>Oh no, there was an error</p>
            ) : isLoading || isFetching ? (
                <div className={styles.single_content}>
                    <Spinner margin="auto" size="xl" />
                </div>
            ) : data ? (
                <div className={styles.single_content}>
                    <div className={styles.single_first_part}>
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
                        <Divider borderColor="#8AAAE5" />

                        <div className={styles.single_content_both_sides}>
                            <div className={styles.single_content_left_side}>
                                <p className={styles.single_genres}>
                                    Genres: <span>{data.genres.join(', ')}</span>
                                </p>
                                <img className={styles.single_img} src={`${data.posterUrl}`} alt={data.title} />

                                <div className={styles.single_rating}>
                                    <div className={styles.single_movie_rating}>
                                        <span className={styles.single_movie_rating_span}>Movie Rating:</span>
                                        {data.rating}
                                        {/* {state.rating} */}
                                    </div>
                                </div>
                            </div>
                            {/* <Center height="300px">
                                <Divider orientation="vertical" borderColor="#8AAAE5" height="100%" />
                            </Center> */}

                            <div className={styles.single_description}>
                                <p className={styles.single_p}>
                                    {data.summary}

                                    {/* {state.summary} */}
                                </p>{' '}
                            </div>
                        </div>
                        <div className={styles.single_bottom_section}>
                            <LibraryButton data={data} />
                        </div>
                        <div className={styles.single_bottom_trailer}>
                            <Button onClick={handleOpenModal}>Watch Trailer</Button>
                        </div>
                    </div>
                    <WatchTrailerModal isOpen={isModalOpen} onClose={handleCloseModal} />
                    {/* <div className={styles.single_second_part}>
                        <div className={styles.player_content}>
                            <div className={styles.player_top}></div>
                            <div className={styles.video_player}>
                                {data.title} {data.videoUrl}
                                {/* <ReactPlayer controls={true} width="100%" height={400} url={state} /> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* <Link href={`/trailer/${data._id}`}>
                            <button className={styles.watch_button}>Watch Trailer</button>
                        </Link> */}
                    {/* </div> */}
                </div>
            ) : null}
        </>
    );
};

export default SingleMovieSection;

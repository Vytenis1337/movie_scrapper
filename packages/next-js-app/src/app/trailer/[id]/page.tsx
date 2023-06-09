'use client';
import styles from './page.module.css';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import newRequest from 'src/utils/newRequest';

const Trailer = ({ params }: any) => {
    const { isLoading, isFetching, error, data } = useQuery({
        queryKey: ['watchTrailer'],
        queryFn: () =>
            newRequest.get(`/movies/${params.id}`).then((res: any) => {
                return res.data;
            }),
    });
    return (
        <div className={styles.player}>
            {error ? (
                <p>Oh no, there was an error</p>
            ) : isLoading || isFetching ? (
                <p>Loading...</p>
            ) : data ? (
                <div className={styles.player_content}>
                    <div className={styles.player_top}>
                        <button className={styles.player_back_button}>
                            <Link href="/" as="/">
                                <BiArrowBack size={30} />
                            </Link>
                        </button>
                    </div>
                    <div className={styles.video_player}>
                        {data.title} {data.videoUrl}
                        {/* <ReactPlayer controls={true} width="100%" height={400} url={state} /> */}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Trailer;

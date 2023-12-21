import Link from 'next/link';
import styles from './page.module.css';

export type MovieCardProps = {
    movieId: string;
    _id: string;
    title: string;
    posterUrl: string;
    rating: number;
};

const MovieCard = ({ movieId, title, posterUrl, _id, rating }: MovieCardProps) => {
    return (
        <div className={styles.movie_card}>
            <div className={styles.body}>
                <Link as={`/movies/${_id}`} href={`/movies/${_id}`}>
                    <img
                        className={styles.movie_img}
                        src={
                            posterUrl
                                ? `${posterUrl}`
                                : 'https://2.bp.blogspot.com/-1no2ep6vJ8U/WqVHSQtSsDI/AAAAAAAAAXI/xkIj0KGNDbkESV39miJuPPuBin3HlX4GgCLcBGAs/s1600/brokenImage.png'
                        }
                        alt={title}
                    />
                </Link>
                <p>IMDB rating: {rating}</p>
            </div>
        </div>
    );
};

export default MovieCard;

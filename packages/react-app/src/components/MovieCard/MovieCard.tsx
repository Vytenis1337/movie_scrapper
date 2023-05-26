import { Link } from 'react-router-dom';
import './MovieCard.css';

export type MovieCardProps = {
    movieId: number;
    title: string;
    posterUrl: string;
    videoUrl: string;
    summary: string;
    rating: number;
    year: number;
    genres: [string];
};

export const MovieCard = ({ movieId, title, posterUrl, videoUrl, summary, rating, year, genres }: MovieCardProps) => {
    return (
        <div className="movie-card">
            <div className="movie-body">
                <Link
                    to={`/movies/${movieId}`}
                    state={{
                        movieId,
                        title,
                        posterUrl,
                        videoUrl,
                        summary,
                        rating,
                        year,
                        genres,
                    }}
                >
                    <img
                        className="movie-img"
                        src={
                            posterUrl
                                ? `${posterUrl}`
                                : 'https://2.bp.blogspot.com/-1no2ep6vJ8U/WqVHSQtSsDI/AAAAAAAAAXI/xkIj0KGNDbkESV39miJuPPuBin3HlX4GgCLcBGAs/s1600/brokenImage.png'
                        }
                        alt={title}
                    />
                </Link>
            </div>
        </div>
    );
};

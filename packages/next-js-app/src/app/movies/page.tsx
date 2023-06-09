import SearchFeature from 'src/components/SearchFeature/SearchFeature';
import MovieCard, { MovieCardProps } from '../../components/MovieCard/MovieCard';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Movies Page',
    description: 'This is the Movies Page',
};

async function getData() {
    const res = await fetch('http://localhost:3000/api/movies');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

const Movies = async () => {
    const data = await getData();

    return (
        <div className={styles.home}>
            <div className="search">
                <SearchFeature data={data} />
            </div>

            <div className={styles.card_container}>
                {data.map((movie: MovieCardProps) => (
                    <MovieCard key={movie.movieId} {...movie} />
                ))}
                {/* <button onClick={pagination.previous}>prev</button>
                    <button onClick={pagination.next}>next</button> */}
            </div>
        </div>
    );
};

export default Movies;

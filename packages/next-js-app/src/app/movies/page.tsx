import { Metadata } from 'next';
import MoviesSection from 'src/components/movies/MoviesSection';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Movies Page',
    description: 'This is the Movies Page',
};

const Movies = () => {
    return (
        <div className={styles.movies}>
            <MoviesSection />
        </div>
    );
};

export default Movies;

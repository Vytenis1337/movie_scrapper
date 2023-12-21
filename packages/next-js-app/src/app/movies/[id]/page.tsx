import { Metadata, ResolvingMetadata } from 'next';
import SingleMovieSection from 'src/components/singleMovie/singleMovieSection/SingleMovieSection';
import styles from './page.module.css';

export type LibraryCardProps = {
    userId: string;
    movieId: string;
    _id: string;
    singleMovieId: string;
    title: string;
    posterUrl: string;
    videoUrl: string;
    summary: string;
    genres: string[];
    rating: number;
    year: string;
};

type PageProps = {
    params: {
        id: string;
    };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const movie = await fetch(`http://localhost:3000/api/movies/${params.id}`).then((res) => res.json());

    return {
        title: movie.title,
    };
}

const SingleMovie = ({ params }: any) => {
    return (
        <div className={styles.single}>
            <SingleMovieSection params={params} />
        </div>
    );
};

export default SingleMovie;

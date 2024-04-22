import { Metadata, ResolvingMetadata } from 'next';
import SingleMovieSection from 'src/components/singleMovie/SingleMovieSection';
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
    const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/movies/${params.id}`;
    try {
        const response = await fetch(url);
        const text = await response.text(); // Get response as text to avoid JSON parse error

        try {
            const data = JSON.parse(text); // Try to parse text as JSON
            return { title: data.title };
        } catch (error) {
            console.error('Failed to parse JSON:', text); // Log the raw text if parsing fails
            throw error;
        }
    } catch (error) {
        console.error('Network error:', error);
        return { title: 'Network or parsing error' };
    }
}

const SingleMovie = ({ params }: any) => {
    return (
        <div className={styles.single}>
            <SingleMovieSection params={params} />
        </div>
    );
};

export default SingleMovie;

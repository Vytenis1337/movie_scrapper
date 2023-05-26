import { Link } from 'react-router-dom';
import './LibraryCard.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

export type LibraryCardProps = {
    userId: number;
    movieId: number;
    _id: number;
    title: string;
    posterUrl: string;
    videoUrl: string;
    summary: string;
    genres: [string];
    rating: number;
    year: number;
};

export const LibraryCard = ({
    _id,
    title,
    posterUrl,
    userId,
    movieId,
    videoUrl,
    summary,
    genres,
    rating,
    year,
}: LibraryCardProps) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.delete(`/library/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myLibrary']);
        },
    });

    const handleDelete = (id: any) => {
        mutation.mutate(id);
    };

    return (
        <div className="library-card">
            <Link
                to={`/movies/${movieId}`}
                state={{
                    posterUrl,
                    userId,
                    title,
                    summary,
                    rating,
                    year,
                    genres,
                    movieId,
                    videoUrl,
                    _id,
                }}
            >
                <img className="library-img" src={`${posterUrl}`} alt={title} />
            </Link>
            <div className="library-body">
                <div className="library-title">{title}</div>

                <div className="library-buttons">
                    <Link
                        to={`/movies/${movieId}`}
                        state={{
                            posterUrl,
                            userId,
                            title,
                            summary,
                            rating,
                            year,
                            genres,
                            movieId,
                            videoUrl,
                            _id,
                        }}
                    >
                        <button className="library-button-details">Details</button>
                    </Link>
                    <button onClick={() => handleDelete(_id)} className="library-button-remove">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

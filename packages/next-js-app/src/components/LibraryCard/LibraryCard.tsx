import styles from './page.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { LibraryCardProps } from 'src/app/movies/[id]/page';
import newRequest from 'src/utils/newRequest';

const LibraryCard = ({ _id, posterUrl, title, singleMovieId }: LibraryCardProps) => {
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
        <div className={styles.library_card}>
            <Link href={`/movies/${singleMovieId}`}>
                <img className={styles.library_img} src={`${posterUrl}`} alt={title} />
            </Link>
            <div className={styles.library_body}>
                <div className={styles.library_title}>{title}</div>

                <div className={styles.library_buttons}>
                    <Link href={`/movies/${singleMovieId}`}>
                        <button className={styles.library_button_details}>Details</button>
                    </Link>
                    <button onClick={() => handleDelete(_id)} className={styles.library_button_remove}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LibraryCard;

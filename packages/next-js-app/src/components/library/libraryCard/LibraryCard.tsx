import { Button } from '@chakra-ui/react';
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
        onMutate: (id) => {
            // Snapshot the current state of the library list
            const previousLibrary = queryClient.getQueryData(['myLibrary']);

            // Optimistically update the UI by removing the item from the library list
            queryClient.setQueryData(['myLibrary'], (oldData: any) => {
                return oldData.filter((item: { _id: any }) => item._id !== id);
            });

            // Return a function to rollback the optimistic update if the mutation fails
            return () => queryClient.setQueryData(['myLibrary'], previousLibrary);
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
                        <Button color="#89abe3" variant="outline">
                            Details
                        </Button>
                    </Link>

                    <Button
                        color="red"
                        variant="solid"
                        onClick={() => handleDelete(_id)}
                        className={styles.library_button_remove}
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LibraryCard;

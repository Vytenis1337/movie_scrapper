import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { LibraryCardProps } from 'src/app/movies/[id]/page';
import { AuthContext } from 'src/providers/auth-context-provider';
import newRequest from 'src/utils/newRequest';
import styles from './page.module.css';

import { MovieType } from 'src/lib/validators/movie-validator';
import { useFetchLibrary } from 'src/app/hooks/useFetchLibrary';
import { Button } from '@chakra-ui/react';

type DataProps = {
    data: MovieType;
};

const LibraryButton = ({ data }: DataProps) => {
    const { currentUser, setLibraryCount } = useContext(AuthContext);

    console.log('CURRENT USER IS:', currentUser);

    const {
        isLoading: isLoadingLibrary,
        isFetching: isFetchingLibrary,
        error: libraryError,
        data: libraryData,
        refetch: LibraryRefetch,
    } = useFetchLibrary();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data: MovieType) => {
            return newRequest.post(`/library`, {
                userId: currentUser?.uid,
                title: data.title,
                posterUrl: data.posterUrl,
                videoUrl: data.videoUrl,
                summary: data.summary,
                year: data.year,
                movieId: data.movieId,
                rating: data.rating,
                genres: data.genres,
                singleMovieId: data._id,
            });
        },
        onMutate: () => {
            setLibraryCount((prev: number) => prev + 1);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myLibrary']);
        },
    });

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        try {
            mutation.mutate(data);
            LibraryRefetch();
            console.log('successfully ');
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            {libraryError ? (
                'there was and Error loading Library'
            ) : isLoadingLibrary || isFetchingLibrary ? (
                'Loading'
            ) : libraryData && currentUser !== null ? (
                <Button
                    size="lg"
                    color="#ea738d"
                    variant="outline"
                    onClick={handleClick}
                    isDisabled={libraryData?.some((movie: LibraryCardProps) => movie.singleMovieId === data?._id)}
                >
                    Add to Library
                </Button>
            ) : null}
        </>
    );
};

export default LibraryButton;

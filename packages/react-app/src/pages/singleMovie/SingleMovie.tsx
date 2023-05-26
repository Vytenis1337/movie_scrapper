import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './SingleMovie.css';
import newRequest from '../../utils/newRequest';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { LibraryCardProps } from '../../components/LibraryCard/LibraryCard';

export const SingleMovie = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const state = useLocation().state;

    const queryClient = useQueryClient();

    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    const currentUserId = JSON.parse(localStorage.getItem('currentUserId') as any);

    console.log(id);

    console.log(state);

    // const { isLoading, error, data } = useQuery({
    //     queryKey: ['movie'],
    //     queryFn: () =>
    //         newRequest.get(`/movies/${state.movieId}`).then((res) => {
    //             return res.data;
    //         }),
    // });

    // console.log(data);

    const mutation = useMutation({
        mutationFn: (state: LibraryCardProps) => {
            return newRequest.post(`/library`, {
                userId: currentUserId,
                title: state.title,
                posterUrl: state.posterUrl,
                videoUrl: state.videoUrl,
                summary: state.summary,
                year: state.year,
                movieId: state.movieId,
                rating: state.rating,
                genres: state.genres,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['myLibrary']);
        },
    });

    const handleClick = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (currentUser) {
            try {
                mutation.mutate(state);
                navigate('/movies');
            } catch (err) {
                console.log(err);
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="single">
            <div>
                <div className="single-content">
                    <div className="single-top">
                        <button className="back-button" onClick={() => navigate('/movies')}>
                            <BiArrowBack size={25} />
                        </button>
                        <div className="single-title">
                            <h1 className="single-h1">{state.title}</h1>
                            <div className="single-release">
                                Release Date:
                                <span>{state.year}</span>
                            </div>
                        </div>
                    </div>
                    <div className="single-content-both-sides">
                        <div className="single-content-left-side">
                            <img className="single-img" src={`${state.posterUrl}`} alt={state.title} />
                            <div className="single-rating">
                                <div className="single-movie-rating">
                                    <span className="single-movie-rating-span">Movie Rating:</span>
                                    {state.rating}
                                </div>
                            </div>
                        </div>
                        <div className="single-description">
                            <p className="single-p">{state.summary}</p>{' '}
                        </div>
                    </div>
                    <div className="single-watch-library">
                        <Link to={`/trailer/${state.movieId}`} state={state.videoUrl}>
                            <button className="watch-button">Watch Trailer</button>
                        </Link>

                        <button onClick={handleClick} className="library-button">
                            Add to Library
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

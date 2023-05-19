import { useQuery } from '@tanstack/react-query';
import './SingleMovie.css';
import newRequest from '../../utils/newRequest';
import { useLocation, useParams } from 'react-router-dom';

export const SingleMovie = () => {
    const { id } = useParams();

    console.log(id);

    // const { isLoading, error, data } = useQuery({
    //     queryKey: ['movie'],
    //     queryFn: () =>
    //         newRequest.get(`/movies/single/${id}`).then((res) => {
    //             return res.data;
    //         }),
    // });

    // console.log(data);

    return <div>singleMovie</div>;
};

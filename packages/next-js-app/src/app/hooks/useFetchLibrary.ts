import { useQuery } from '@tanstack/react-query';
import newRequest from 'src/utils/newRequest';

export const useFetchLibrary = () => {
    const query = useQuery({
        queryKey: ['myLibrary'],
        queryFn: () =>
            newRequest.get(`/library`).then((res) => {
                return res.data;
            }),
    });
    return query;
};

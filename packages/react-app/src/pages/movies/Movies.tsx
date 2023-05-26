import './Movies.css';
import newRequest from '../../utils/newRequest';
import { usePagination } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { MovieCard, MovieCardProps } from '../../components/MovieCard/MovieCard';
import { SearchFeature } from '../../components/SearchFeature/SearchFeature';
import { useMemo, useState } from 'react';

export const Movies = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [search, setSearch] = useState<string>('');

    const { isLoading, error, data } = useQuery({
        queryKey: ['movies'],
        queryFn: () =>
            newRequest.get(`/movies`).then((res) => {
                return res.data;
            }),
    });
    const itemsPerPage = 20;

    const [visibleResults, setVisibleResults] = useState(data?.slice(0, itemsPerPage));

    const getFilteredList = () => {
        if (!selectedCategory) {
            return data;
        }

        return data.filter((item: { genres: any }) => item.genres.includes(selectedCategory));
    };

    let filteredList: any = useMemo(getFilteredList, [selectedCategory, data]);

    const pagination = usePagination({
        total: Math.ceil(data?.length / itemsPerPage),
        initialPage: 1,
        onChange(page) {
            const start = page * itemsPerPage;
            const end = start + itemsPerPage;
            setVisibleResults(data?.slice(start, end));
            console.log('button pressed');
        },
    });

    console.log(visibleResults);

    return (
        <div className="home">
            <div className="search">
                <SearchFeature setSearch={setSearch} setSelectedCategory={setSelectedCategory} data={data} />
            </div>
            {isLoading ? (
                'Loading'
            ) : error ? (
                'Something went wrong!'
            ) : (
                <div className="card-container">
                    {filteredList
                        ?.filter((item: { title: string }) => {
                            return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search);
                        })
                        ?.map((movie: MovieCardProps) => (
                            <MovieCard key={movie.movieId} {...movie} />
                        ))}
                    {/* <button onClick={pagination.previous}>prev</button>
                    <button onClick={pagination.next}>next</button> */}
                </div>
            )}
        </div>
    );
};

import './Movies.css';
import newRequest from '../../utils/newRequest';

import { useQuery } from '@tanstack/react-query';
import { MovieCard, MovieCardProps } from '../../components/MovieCard/MovieCard';
import { SearchFeature } from '../../components/SearchFeature/SearchFeature';
import { useMemo, useState } from 'react';

export const Movies = () => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [search, setSearch] = useState<string>('');
    const { isLoading, error, data } = useQuery({
        queryKey: ['movies'],
        queryFn: () =>
            newRequest.get(`/movies`).then((res) => {
                return res.data;
            }),
    });

    const getFilteredList = () => {
        if (!selectedCategory) {
            return data;
        }

        return data.filter((item: { genres: any }) => item.genres === selectedCategory);
    };

    let filteredList = useMemo(getFilteredList, [selectedCategory, data]);

    return (
        <div className="home">
            <div className="search">
                <SearchFeature setSearch={setSearch} />
            </div>
            {isLoading ? (
                'Loading'
            ) : error ? (
                'Something went wrong!'
            ) : (
                <div className="card-container">
                    {filteredList
                        .filter((item: { title: string }) => {
                            return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search);
                        })
                        .map((movie: MovieCardProps) => (
                            <MovieCard key={movie.movieId} {...movie} />
                        ))}
                </div>
            )}
        </div>
    );
};

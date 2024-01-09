'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useMemo, useCallback } from 'react';
import SearchFeature from 'src/components/SearchFeature/SearchFeature';
import newRequest from 'src/utils/newRequest';
import MovieCard, { MovieCardProps } from '../movieCard/MovieCard';
import styles from './page.module.css';
import MoviesPagination from '../moviesPagination/MoviesPagination';
import { Divider, Spinner } from '@chakra-ui/react';

const MoviesSection = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [search, setSearch] = useState<string>('');

    const fetchData = useCallback(async () => {
        try {
            const res = await newRequest.get(`/movies?genres=${selectedCategory}&search=${search}`);
            console.log('the MOVIE DATA IS:', res.data);
            return res.data;
        } catch (error) {
            throw error;
        }
    }, [selectedCategory, search]);

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['movies'],
        queryFn: fetchData,
    });

    useEffect(() => {
        refetch();
    }, [fetchData]);

    const itemsPerPage = 20;

    const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage]);
    const visibleItems = useMemo(
        () => data?.slice(startIndex, startIndex + itemsPerPage) || [],
        [data, startIndex, itemsPerPage]
    );

    const totalPages = useMemo(() => Math.ceil(data?.length / itemsPerPage), [data, itemsPerPage]);
    console.log(search);
    return (
        <>
            {error ? (
                <p>Oh no, there was an error!</p>
            ) : isLoading ? (
                <div className={styles.movie_section}>
                    <Spinner margin="auto" size="xl" />
                </div>
            ) : data ? (
                <div className={styles.movie_section}>
                    <div className={styles.search}>
                        <SearchFeature
                            setSearch={setSearch}
                            setSelectedCategory={setSelectedCategory}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                    <Divider />
                    <div className={styles.card_container}>
                        {
                            // filteredList
                            //     ?.filter((item: { title: string }) => {
                            //         return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search);
                            //     })
                            //     ?
                            visibleItems.map((movie: MovieCardProps) => (
                                <MovieCard key={movie.movieId} {...movie} />
                            ))
                        }
                    </div>
                    <div className={styles.pagination_container}>
                        <MoviesPagination
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            visibleItems={visibleItems}
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default MoviesSection;

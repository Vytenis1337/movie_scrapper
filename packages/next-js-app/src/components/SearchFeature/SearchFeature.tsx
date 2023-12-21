'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from 'src/utils/newRequest';
import styles from './page.module.css';

const SearchFeature = ({ setSearch, setSelectedCategory, activeCategory, setActiveCategory, setCurrentPage }: any) => {
    const { isLoading, error, data } = useQuery({
        queryKey: ['movieCategories'],
        queryFn: () =>
            newRequest.get(`/movies`).then((res) => {
                return res.data;
            }),
    });

    const categories = [...new Set(data?.map((item: { genres: string[] }) => item.genres))];

    const uniqueCategories: string[] | unknown[] = [...new Set(categories?.flat())];

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>, category: string) => {
        event.preventDefault();
        const element = event.currentTarget as HTMLInputElement;
        const value = element.textContent;
        setSearch('');
        setSelectedCategory(value);
        setActiveCategory(category);
        setCurrentPage(1);
    };

    const handleClickAll = (all: string) => {
        setSearch('');
        setSelectedCategory('');
        setActiveCategory(all);
        setCurrentPage(1);
    };

    return (
        <div className={styles.search_feature}>
            {' '}
            <input
                className={styles.search_input}
                type="text"
                placeholder="Search Movie..."
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.search_categories}>
                <button
                    className={activeCategory === 'all' ? styles.active_all : styles.all_button}
                    onClick={() => handleClickAll('all')}
                >
                    All
                </button>
                {uniqueCategories?.map((category: any) => (
                    <button
                        className={activeCategory === `${category}` ? styles.active_category : styles.categories_button}
                        onClick={(e) => handleClick(e, category)}
                        key={category}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchFeature;

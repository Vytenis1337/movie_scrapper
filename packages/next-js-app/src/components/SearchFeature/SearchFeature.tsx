'use client';

import { useState } from 'react';
import styles from './page.module.css';

// async function getData(category: any) {
//     const res = await fetch(`http://localhost:3000/api/movies?genres=${category}`);

//     if (!res.ok) {
//         throw new Error('Failed to fetch data');
//     }

//     return res.json();
// }

async function fetchCategoryData(category: any) {
    const response = await fetch(`http://localhost:3000/api/movies?genres=${category}`);
    const catData = await response.json();
    return catData;
}

const SearchFeature = ({ data }: any) => {
    const [activeCategory, setActiveCategory] = useState(null);

    const categories = [...new Set(data?.map((item: { genres: any }) => item.genres))];

    const uniqueCategories: any = [...new Set(categories?.flat())];

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>, category: any) => {
        event.preventDefault();
        const element = event.currentTarget as HTMLInputElement;
        const value: any = element.textContent;
        const search = await fetchCategoryData(category);
        console.log(search);

        setActiveCategory(category);
    };

    const handleClickAll = (all: any) => {
        setActiveCategory(all);
    };

    return (
        <div className={styles.search_feature}>
            {' '}
            <input
                className={styles.search_input}
                type="text"
                placeholder="Search Movie..."

                // onChange={(e) => setSearch(e.target.value)}
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

import { SetStateAction, useState } from 'react';
import './SearchFeature.css';

export const SearchFeature = ({ setSearch, setSelectedCategory, data }: any) => {
    const [activeCategory, setActiveCategory] = useState(null);

    const categories = [...new Set(data?.map((item: { genres: any }) => item.genres))];

    const uniqueCategories: any = [...new Set(categories.flat())];

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, category: any) => {
        event.preventDefault();
        const element = event.currentTarget as HTMLInputElement;
        const value: any = element.textContent;
        setSearch('');
        setSelectedCategory(value);
        setActiveCategory(category);
    };

    const handleClickAll = (all: any) => {
        setSearch('');
        setSelectedCategory('');
        setActiveCategory(all);
    };

    return (
        <div className="search-feature">
            {' '}
            <input
                className="search-input"
                type="text"
                placeholder="Search Movie..."
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-categories">
                <button
                    className={activeCategory === 'all' ? 'active-all' : 'all-button'}
                    onClick={() => handleClickAll('all')}
                >
                    All
                </button>
                {uniqueCategories?.map((category: any) => (
                    <button
                        className={activeCategory === `${category}` ? 'active-category' : 'categories-button'}
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

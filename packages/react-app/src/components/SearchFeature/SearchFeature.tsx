import { useState } from 'react';
import './SearchFeature.css';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

export const SearchFeature = ({ setSearch }: any) => {
    const navigate = useNavigate();

    // const handleSubmit = () => {
    //     navigate(`/movies?search=${search}`);
    // };

    return (
        <div className="search-feature">
            {' '}
            <input
                className="search-input"
                type="text"
                placeholder="Write Movie name"
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
};

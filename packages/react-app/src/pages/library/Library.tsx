import './Library.css';
import { useQuery } from '@tanstack/react-query';

import newRequest from '../../utils/newRequest';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { LibraryCard, LibraryCardProps } from '../../components/LibraryCard/LibraryCard';

export const Library = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    const currentUserId = JSON.parse(localStorage.getItem('currentUserId') as any);

    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ['myLibrary'],

        queryFn: () =>
            newRequest.get(`/library?userId=${currentUserId}`).then((res) => {
                return res.data;
            }),
    });
    console.log(data);

    console.log(currentUserId);

    return (
        <div className="library">
            <div className="library-top-section">
                <button onClick={() => navigate(-1)} className="library-back-button">
                    <BiArrowBack size={30} />
                </button>
                <h1 className="library-main-title">My Library</h1>
            </div>

            {isLoading ? (
                'loading'
            ) : error ? (
                'Something went wrong!'
            ) : (
                <div className="library-content">
                    {data.map((item: LibraryCardProps) => (
                        <LibraryCard key={item._id} {...item} />
                    ))}
                </div>
            )}
        </div>
    );
};

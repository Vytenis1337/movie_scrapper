import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
    return (
        <div className="home">
            <div className="home-content">
                <Link to={'/login'}>
                    <button className="home-button">
                        {' '}
                        <span>Login</span>
                    </button>
                </Link>
                <Link to={'/movies'}>
                    <button className="home-button">
                        <span>Movies</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

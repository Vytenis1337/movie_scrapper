import { useLocation, useNavigate } from 'react-router-dom';
import './Trailer.css';
import ReactPlayer from 'react-player';
import { BiArrowBack } from 'react-icons/bi';

export const Trailer = () => {
    const state = useLocation().state;
    console.log(state);
    const navigate = useNavigate();

    return (
        <div className="player">
            <div className="player-content">
                <div className="player-top">
                    <button className="player-back-button" onClick={() => navigate(-1)}>
                        <BiArrowBack size={30} />
                    </button>
                </div>
                <div className="video-player">
                    <ReactPlayer controls={true} width="100%" height={400} url={state} />
                </div>
            </div>
        </div>
    );
};

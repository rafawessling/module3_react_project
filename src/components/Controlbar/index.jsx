import Next from '../../assets/next.svg';
import Play from '../../assets/play.svg';
import Pause from '../../assets/pause.svg';
import Previous from '../../assets/previous.svg';
import Stop from '../../assets/stop.svg';
import './style.css';

export default function Controlbar({ title, artist, isPlaying, togglePlayPause, handlePrevMusic, handleStopMusic }) {
    return (
        <>
            <section className="container-controlbar">
                <div className="current-music">
                    <h3>{title}</h3>
                    <span>{artist}</span>
                </div>
                <div className="control">
                    <div className="buttons">
                        <img src={Stop} alt="" onClick={() => handleStopMusic()} />
                        <img src={Previous} alt="" onClick={() => handlePrevMusic()} />
                        <img src={isPlaying ? Pause : Play} alt="" onClick={() => togglePlayPause()} />
                        <img src={Next} alt="" />
                    </div>
                    <div className="progressbar">
                        <span>00:00</span>
                        <input className="progress" type="range" />
                        <span>03:34</span>
                    </div>
                </div>
            </section>
        </>
    );
}

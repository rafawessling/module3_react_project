import Stop from '../../assets/stop.svg';
import Previous from '../../assets/previous.svg';
import Pause from '../../assets/pause.svg';
import Play from '../../assets/play.svg';
import Next from '../../assets/next.svg';
import './style.css';

export default function Controlbar({ title, artist }) {
    return (
        <>
            <section className="container-controlbar">
                <div className="current-music">
                    <h3>{title}</h3>
                    <span>{artist}</span>
                </div>
                <div className="control">
                    <div className="buttons">
                        <img src={Stop} alt="" />
                        <img src={Previous} alt="" />
                        <img src={Play} alt="" />
                        <img src={Next} alt="" />
                    </div>
                    <div className="progressbar">
                        <span>00:00</span>
                        <input type="range" value="50" max="100" />
                        <span>03:34</span>
                    </div>
                </div>
            </section>
        </>
    );
}

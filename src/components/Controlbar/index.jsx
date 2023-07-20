import Next from '../../assets/next.svg';
import Play from '../../assets/play.svg';
import Pause from '../../assets/pause.svg';
import Previous from '../../assets/previous.svg';
import Stop from '../../assets/stop.svg';
import VolumeUp from '../../assets/volume-up.svg';
import Volume from '../../assets/volume.svg';
import VolumeDown from '../../assets/volume-down.svg';
import Mute from '../../assets/volume-mute.svg';
import './style.css';

export default function Controlbar({
    title,
    artist,
    isPlaying,
    togglePlayPause,
    handlePrevMusic,
    handleNextMusic,
    handleStopMusic,
    isStopped,
    currentTime,
    duration,
    currentPosition,
    handleSlider,
    handleVolume,
    volume,
    handleMute,
}) {
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
                        <img src={Next} alt="" onClick={() => handleNextMusic()} />
                    </div>
                    <div className="progressbar">
                        <span>{title ? currentTime : '00:00'}</span>
                        <input
                            className="slider"
                            type="range"
                            value={currentPosition ? currentPosition : 0}
                            onChange={handleSlider}
                            disabled={isStopped}
                            style={{
                                background: `linear-gradient(to right, #E5007B ${currentPosition}%, #CCC3C3 ${currentPosition}%)`,
                            }}
                        />
                        <span>{title ? duration : '00:00'}</span>
                    </div>
                </div>
                <div className="volume">
                    <img
                        src={volume < 0.01 ? Mute : volume >= 0.7 ? VolumeUp : volume >= 0.3 ? Volume : VolumeDown}
                        alt=""
                        defaultValue={Volume}
                        onClick={() => {
                            if (!isStopped && title) {
                                handleMute();
                            }
                        }}
                    />
                    <input
                        className="slider volume-bar"
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isPlaying ? volume : 0}
                        onChange={handleVolume}
                        disabled={isStopped}
                        style={{
                            background: `linear-gradient(to right, ${isPlaying ? '#E5007B' : '#CCC3C3'} ${
                                volume * 100
                            }%, #CCC3C3 ${volume * 100}%)`,
                        }}
                    />
                </div>
            </section>
        </>
    );
}

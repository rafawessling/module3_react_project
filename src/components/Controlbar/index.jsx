import Next from '../../assets/next.svg';
import Pause from '../../assets/pause.svg';
import Play from '../../assets/play.svg';
import Previous from '../../assets/previous.svg';
import Stop from '../../assets/stop.svg';
import VolumeDown from '../../assets/volume-down.svg';
import Mute from '../../assets/volume-mute.svg';
import VolumeUp from '../../assets/volume-up.svg';
import Volume from '../../assets/volume.svg';
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
                    <h3>{!isStopped && title}</h3>
                    <span>{!isStopped && artist}</span>
                </div>
                <section className="control">
                    <div className="buttons">
                        <img src={Stop} alt="Stop icon" onClick={handleStopMusic} />
                        <img src={Previous} alt="Previous icon" onClick={handlePrevMusic} />
                        <img
                            src={isPlaying ? Pause : Play}
                            alt={isPlaying ? 'Pause icon' : 'Play icon'}
                            onClick={togglePlayPause}
                        />
                        <img src={Next} alt="Next icon" onClick={handleNextMusic} />
                    </div>
                    <div className="progressbar">
                        <span>{!isStopped && currentTime}</span>
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
                        <span>{!isStopped && duration}</span>
                    </div>
                </section>
                <section className="volume">
                    <img
                        src={
                            volume.currVolume < 0.01
                                ? Mute
                                : volume.currVolume >= 0.7
                                ? VolumeUp
                                : volume.currVolume >= 0.3
                                ? Volume
                                : VolumeDown
                        }
                        alt={volume.currVolume < 0.01 ? 'Muted icon' : 'Volume icon'}
                        defaultValue={VolumeUp}
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
                        value={title ? volume.currVolume : 1}
                        onChange={handleVolume}
                        disabled={isStopped || !title}
                        style={{
                            background: `linear-gradient(to right, #E5007B ${volume.currVolume * 100}%, #CCC3C3 ${
                                volume.currVolume * 100
                            }%)`,
                        }}
                    />
                </section>
            </section>
        </>
    );
}

import { useEffect, useRef, useState } from 'react';
import Card from '../../components/Card/index.jsx';
import Controlbar from '../../components/Controlbar';
import Header from '../../components/Header';
import { musics } from '../../musics';
import './style.css';

function App() {
    const audioRef = useRef(null);
    // eslint-disable-next-line
    const [musicsData, setMusicsData] = useState([...musics]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusic, setCurrentMusic] = useState({
        id: 0,
        artist: '',
        title: '',
        url: '',
    });
    const [isStopped, setIsStopped] = useState(false);
    const [duration, setDuration] = useState('00:00');
    const [currentTime, setCurrentTime] = useState('00:00');
    const [currentPosition, setCurrentPosition] = useState(0);
    const [volume, setVolume] = useState(1);

    function toggleMusic(url) {
        if (audioRef.current.src === url) {
            togglePlayPause();
        } else {
            audioRef.current.src = url;
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    function setMusic(selectedMusic) {
        setCurrentMusic(selectedMusic);
        toggleMusic(selectedMusic.url);
    }

    function togglePlayPause() {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else if (currentMusic.id) {
            audioRef.current.play();
            setIsPlaying(true);
        } else if (!isStopped) {
            setCurrentMusic(musicsData[0]);
            toggleMusic(musicsData[0].url);
        }
    }

    function handlePrevMusic() {
        if (currentMusic.id) {
            const index = musicsData.indexOf(currentMusic);
            const prevMusic = index === 0 ? musicsData[musicsData.length - 1] : musicsData[index - 1];

            setCurrentMusic(prevMusic);
            toggleMusic(prevMusic.url);
        }
    }

    function handleNextMusic() {
        if (currentMusic.id) {
            const index = musicsData.indexOf(currentMusic);
            const nextMusic = index === musicsData.length - 1 ? musicsData[0] : musicsData[index + 1];

            setCurrentMusic(nextMusic);
            toggleMusic(nextMusic.url);
        }
    }

    function handleStopMusic() {
        if (isPlaying || audioRef.current.paused) {
            audioRef.current.pause();
            audioRef.current.src = '';

            setCurrentMusic({ id: 0, artist: '', title: '', url: '' });
            setIsPlaying(false);
            setCurrentPosition(0);
            setIsStopped(true);
        }
    }

    function handleEndedMusic() {
        const index = musicsData.indexOf(currentMusic);
        const nextMusic = index + 1 === musics.length ? musicsData[0] : musicsData[index + 1];

        setCurrentMusic(nextMusic);
        toggleMusic(nextMusic.url);
    }

    function handleLoadMetaData() {
        const totalDuration = audioRef.current.duration;
        const minTotal = String(Math.floor(totalDuration / 60)).padStart(2, '0');
        const secTotal = String(Math.floor(totalDuration % 60)).padStart(2, '0');
        const formattedDuration = `${minTotal}:${secTotal}`;

        setDuration(formattedDuration);
    }

    useEffect(() => {
        setInterval(() => {
            const timeMusic = audioRef.current.currentTime;
            const minCurr = String(Math.floor(timeMusic / 60)).padStart(2, '0');
            const secCurr = String(Math.floor(timeMusic % 60)).padStart(2, '0');
            const formattedCurrentTime = `${minCurr}:${secCurr}`;
            setCurrentTime(formattedCurrentTime);

            const totalDuration = audioRef.current.duration;
            const sliderPosition = (timeMusic / totalDuration) * 100;
            setCurrentPosition(sliderPosition);
        }, 0);
    }, [currentMusic]);

    function handleSlider(event) {
        const position = event.target.value;
        setCurrentPosition(position);

        const totalDuration = audioRef.current.duration;
        const positionTime = (position / 100) * totalDuration;
        audioRef.current.currentTime = positionTime;
    }

    function handleVolume(event) {
        const volumeValue = event.currentTarget.valueAsNumber;
        setVolume(volumeValue);
        audioRef.current.volume = volumeValue;
    }

    function handleMute() {
        if (audioRef.current) {
            if (audioRef.current.volume !== 0) {
                audioRef.current.volume = 0;
                setVolume(0);
            } else {
                audioRef.current.volume = 1;
                setVolume(1);
            }
        }
    }

    return (
        <div className="container">
            <Header />
            <main>
                <h2 className="title-play-list">The best playlist</h2>
                <div className="cards-musics">
                    {musicsData.map(music => (
                        <div key={music.id} onClick={() => setMusic(music)}>
                            <Card cover={music.cover} title={music.title} description={music.description} />
                        </div>
                    ))}
                </div>
            </main>
            <Controlbar
                title={currentMusic.title}
                artist={currentMusic.artist}
                isPlaying={isPlaying}
                togglePlayPause={togglePlayPause}
                handlePrevMusic={handlePrevMusic}
                handleNextMusic={handleNextMusic}
                handleStopMusic={handleStopMusic}
                isStopped={isStopped}
                currentTime={currentTime}
                duration={duration}
                currentPosition={currentPosition}
                handleSlider={event => handleSlider(event)}
                handleVolume={event => handleVolume(event)}
                volume={volume}
                handleMute={handleMute}
            />
            <audio
                ref={audioRef}
                autoPlay="autoplay"
                onLoadedMetadata={handleLoadMetaData}
                onEnded={handleEndedMusic}
            />
        </div>
    );
}

export default App;

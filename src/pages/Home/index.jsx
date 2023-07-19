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
    // eslint-disable-next-line
    const [isStopped, setIsStopped] = useState(false);

    function setMusic(selectedMusic) {
        if (isPlaying && audioRef.current.src === selectedMusic.url) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            setCurrentMusic(selectedMusic);
            audioRef.current.src = selectedMusic.url;
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    function togglePlayPause() {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else if (currentMusic.id) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    function handlePrevMusic() {
        const index = musicsData.indexOf(currentMusic);
        const prevMusic = index === 0 ? musicsData[musicsData.length - 1] : musicsData[index - 1];

        audioRef.current.src = prevMusic.url;
        audioRef.current.play();
        setCurrentMusic(prevMusic);
        setIsPlaying(true);
    }

    function handleNextMusic() {
        const index = musicsData.indexOf(currentMusic);
        const nextMusic = index === musicsData.length - 1 ? musicsData[0] : musicsData[index + 1];

        audioRef.current.src = nextMusic.url;
        audioRef.current.play();
        setCurrentMusic(nextMusic);
        setIsPlaying(true);
    }

    function handleStopMusic() {
        if (isPlaying || audioRef.current.paused) {
            audioRef.current.pause();
            audioRef.current.src = '';

            setCurrentMusic({ id: 0, artist: '', title: '', url: '' });
            setIsPlaying(false);
            setIsStopped(true);
        }
    }

    function handleEndedMusic() {
        const index = musicsData.indexOf(currentMusic);

        if (index + 1 < musicsData.length) {
            const nextMusic = musicsData[index + 1];
            setCurrentMusic(nextMusic);
            audioRef.current.src = nextMusic.url;
            audioRef.current.play();
            setIsPlaying(true);
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
            />
            <audio ref={audioRef} autoPlay="autoplay" onEnded={handleEndedMusic} />
        </div>
    );
}

export default App;

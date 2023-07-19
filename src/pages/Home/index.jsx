import { useRef, useState } from 'react';
import Card from '../../components/Card/index.jsx';
import Controlbar from '../../components/Controlbar';
import Header from '../../components/Header';
import { musics } from '../../musics';
import './style.css';

function App() {
    const audioRef = useRef(null);

    const [musicsData, setMusicsData] = useState([...musics]);
    // eslint-disable-next-line
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMusic, setCurrentMusic] = useState({
        id: 0,
        artist: '',
        title: '',
        url: '',
    });

    function setMusic(selectedMusic) {
        if (isPlaying) {
            if (audioRef.current.src === selectedMusic.url) {
                audioRef.current.pause();
                setIsPlaying(false);
                return;
            } else {
                audioRef.current.play();
                setIsPlaying(true);
                return;
            }
        }

        setCurrentMusic(selectedMusic);

        audioRef.current.src = selectedMusic.url;

        audioRef.current.play();

        setIsPlaying(true);
    }

    function togglePlayPause() {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
            return;
        }

        if (audioRef.current.paused) {
            if (currentMusic.id) {
                audioRef.current.play();
                setIsPlaying(true);
                return;
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
            />
            <audio ref={audioRef} />
        </div>
    );
}

export default App;

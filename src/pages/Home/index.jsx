import Header from '../../components/Header';
import './style.css';
import { musics } from '../../musics';
import { useState } from 'react';
import Card from '../../components/Card/index.jsx';
import Controlbar from '../../components/Controlbar';

function App() {
    const [musicsData, setMusicsData] = useState([...musics]);
    const audioRef = useState(null);
    const [playing, setPlaying] = useState(false);

    function handleMusicStart(music) {}

    return (
        <div className="container">
            <Header />
            <main>
                <h2 className="title-play-list">The best play list</h2>
                <div className="cards-musics">
                    {musicsData.map(music => (
                        <div key={music.id}>
                            <Card
                                onClick={music => handleMusicStart(music)}
                                cover={music.cover}
                                title={music.title}
                                description={music.description}
                            />
                        </div>
                    ))}
                </div>
            </main>
            <Controlbar title={musicsData.title} artist={musicsData.artist} />
        </div>
    );
}

export default App;

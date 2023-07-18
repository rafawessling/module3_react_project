import Header from '../../components/Header';
import './style.css';
import { musics } from '../../musics';
import { useState } from 'react';
import Card from '../../components/Card/index.jsx';

function App() {
    const [musicsData, setMusicsData] = useState([...musics]);

    return (
        <div className="container">
            <div>
                <Header />
                <section>
                    <h2 className="title-play-list">The best play list</h2>
                    <div className="cards-musics">
                        {musicsData.map(music => (
                            <div key={music.id}>
                                <Card cover={music.cover} title={music.title} description={music.description} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default App;

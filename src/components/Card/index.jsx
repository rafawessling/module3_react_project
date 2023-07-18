import './style.css';

export default function Card({ cover, title, description }) {
    return (
        <>
            <div className="container-card">
                <img className="cover" src={cover} alt="" />
                <h3 className="title-music">{title}</h3>
                <p className="description-music">{description}</p>
            </div>
        </>
    );
}

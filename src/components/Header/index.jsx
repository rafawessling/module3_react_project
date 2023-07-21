import Logo from '../../assets/logo.svg';
import Profile from '../../assets/profile.jpeg';
import './style.css';

export default function Header() {
    return (
        <>
            <section className="container-header">
                <img
                    className="logo-image"
                    src={Logo}
                    alt="Website logo with the word CUBOS and a play icon in white plus the word PLAYER pink"
                />
                <div className="perfil">
                    <img
                        className="profile-image"
                        src={Profile}
                        alt="A light background with a white blond woman with long hair and"
                    />
                    <span>Welcome, Rafaela.</span>
                </div>
            </section>
        </>
    );
}

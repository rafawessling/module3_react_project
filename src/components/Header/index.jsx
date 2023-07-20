import Logo from '../../assets/logo.svg';
import Profile from '../../assets/profile.jpeg';
import './style.css';

export default function Header() {
    return (
        <>
            <section className="container-header">
                <img className="logo-image" src={Logo} alt="" />
                <div className="perfil">
                    <img className="profile-image" src={Profile} alt="" />
                    <span>Welcome, Rafaela.</span>
                </div>
            </section>
        </>
    );
}

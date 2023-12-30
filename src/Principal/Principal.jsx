import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Principal.css';
function Principal(params) {
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleLogout = () => {
        setLoggedIn(false);
        window.localStorage.clear()
        navigate("/")
    };

    const verInicioSesion = () => {
        if (window.localStorage.getItem("Usuario") != null) {
            setLoggedIn(true);
            window.localStorage.setItem("estadoSesion", "true")
        }
    }

    useEffect(() => {
        verInicioSesion()
    }, [])

    return (
        <>
            <div className="app">
                <nav className="navbar">
                    <h3>Sangre Segura</h3>
                    <div className="navbar-right">
                        <Link to="/" className="active-link">Inicio</Link>
                        <Link to="/Donaciones" className="active-link">Personas e Intituciones</Link>
                        <Link to="/Donantes" className="active-link">Donantes</Link>
                        {isLoggedIn ? (
                            <Link to="/Perfil" className='active-link'>Mi Perfil</Link>
                        ) : (
                            null
                        )}
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className='active-link'>Cerrar Sesión</button>
                        ) : (
                            <Link to="/Login" className="active-link">Iniciar Sesión</Link>
                        )}
                    </div>
                </nav>
                <div className="hero-section">
                    <img src="./Imagenes/headerPrincipal.webp" alt="Imagen header pagina principal" className="hero-image" />
                    <div className="hero-text">
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                    </div>
                </div>
                <div className="bottom-text">
                    <h2 >Bienvenido a Sangre Segura Xalapa</h2>
                    <p className='centrarTextoPrincipal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, consequuntur aliquam deleniti maxime cumque voluptate fuga ducimus error consequatur consectetur dolorum itaque ipsam animi nisi delectus accusamus in voluptatem saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat facere ex harum dignissimos est a saepe suscipit aliquam earum! Error sunt culpa, perferendis nesciunt eligendi ipsum exercitationem adipisci porro inventore!</p>
                </div>
                <div className="image-container">
                    <h2>Título del Contenedor</h2>
                    <div className="image-row">
                        <div className="image">
                            <img src="./Imagenes/retratoHombrePrincipal.webp" alt="Imagen Donante 1" />
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore odio soluta voluptatum sed recusandae quasi expedita eaque, ut est animi, enim voluptates temporibus. Obcaecati quaerat perferendis quo praesentium excepturi incidunt!</p>
                        </div>
                        <div className="image">
                            <img src="./Imagenes/fachadaHospitalPrincipal.webp" alt="Imagen Donante 2" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium cupiditate est minus ab non aut enim iusto, reiciendis cumque illo aperiam nam esse vel. Accusantium quasi velit quos vitae dolores.</p>
                        </div>
                        <div className="image">
                            <img src="./Imagenes/retratoMujerPrincipal.webp" alt="Imagen Donante 3" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus mollitia ipsam enim accusantium voluptatum molestiae perspiciatis? Dolores, sit? Possimus blanditiis suscipit excepturi quos veritatis illo sequi omnis ea nostrum quisquam.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Principal;

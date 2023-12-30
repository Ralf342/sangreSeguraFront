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
                        <h2>La esperanza fluye en cada donación. Juntos, superaremos esto</h2>
                    </div>
                </div>
                <div className="bottom-text">
                    <h2 >Bienvenido a Sangre Segura Xalapa</h2>
                    <p className='centrarTextoPrincipal'>Sangre Segura Xalapa ha sido un apoyo invaluable para mi familia. Gracias a ella pudimos llegar a mas personas  y conseguir la sangre necesaria para mi hija en un momento muy difícil.</p>
                </div>
                <div className="image-container">
                    <h2>Título del Contenedor</h2>
                    <div className="image-row">
                        <div className="image">
                            <img src="./Imagenes/retratoHombrePrincipal.webp" alt="Imagen Donante 1" />
                            <p>Nombre: Pablo González

                                Fecha de Nacimiento: 10 de abril de 1935

                                Antecedentes Médicos:

                                Hipertensión arterial diagnosticada en 1995.
                                Diabetes tipo 2 diagnosticada en 2003.
                                Osteoartritis crónica en las articulaciones de las rodillas desde 2010.
                                Historial de eventos cardiovasculares en la familia.
                            </p>
                        </div>
                        <div className="image">
                            <img src="./Imagenes/fachadaHospitalPrincipal.webp" alt="Imagen Donante 2" />
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium cupiditate est minus ab non aut enim iusto, reiciendis cumque illo aperiam nam esse vel. Accusantium quasi velit quos vitae dolores.</p>
                        </div>
                        <div className="image">
                            <img src="./Imagenes/retratoMujerPrincipal.webp" alt="Imagen Donante 3" />
                            <p>Nombre Ana Rodríguez
                                Fecha de Nacimiento: 25 de julio de 1990
                                Antecedentes Médicos:
                                No se reportan antecedentes médicos significativos.
                                No hay historial de enfermedades crónicas en la familia.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Principal;

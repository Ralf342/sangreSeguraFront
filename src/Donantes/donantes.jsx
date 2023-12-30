import axios from "axios"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Donantes(params) {

    const navigate = useNavigate()
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [donantesData, setDonanteData] = useState([]);

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

    const obtenerDonantes = async () => {
        try {
            const response = await axios.get("http://localhost:4567/donantes");
            console.log(response.data)
            setDonanteData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerDonantes()
    }, [])

    return (
        <>
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
                        <button onClick={handleLogout}>Cerrar Sesión</button>
                    ) : (
                        <Link to="/Login" className="active-link">Iniciar Sesión</Link>
                    )}
                </div>
            </nav>
            <h1>Donantes Registrados</h1>
            <div className="contenedorDonantes">
                {donantesData.map((elemento) =>
                    <div key={elemento.nombre} className='inforDonante'>
                        <div className="tituloInfoDonante">Nombre: </div>
                        <div className="textoInfoDonante">{elemento.nombre} {elemento.apellidos}</div>
                        <div className="tituloInfoDonante">Telefono: </div>
                        <div className="textoInfoDonante">{elemento.telefono}</div>
                        <div className="tituloInfoDonante">Tipo de Sangre: </div>
                        <div className="textoInfoDonante">{elemento.tipoDeSangre}</div>
                        <div className="tituloInfoDonante">Enfermedades: </div>
                        <div className="textoInfoDonante">{elemento.enfermedades}</div>
                    </div>
                )}
            </div>

        </>
    )
}

export default Donantes
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios'

function Donaciones(params) {
    const navigate = useNavigate()
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [donacionesPersonasData, setDatosDonacionesPersonas] = useState([]);
    const [donacionesHospitalesData, setDatosDonacionesHospitales] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:4567/donacionesPersonas");
                // console.log(res.data);
                setDatosDonacionesPersonas(res.data);
            } catch (error) {
                throw error;
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:4567/donacionesHospitales");
                // console.log(res.data);
                setDatosDonacionesHospitales(res.data);
            } catch (error) {
                throw error;
            }
        };
        fetchData();
    }, []);

    const handleLogout = () => {
        setLoggedIn(false);
        window.localStorage.clear()
        navigate("/")
    };

    const verInicioSesion = () => {
        if (window.localStorage.getItem("Usuario") != null) {
            setLoggedIn(true);
            window.localStorage.setItem("estadoSesion", "true")
            window.localStorage.setItem("donaciones", "false")
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
                            <button onClick={handleLogout}>Cerrar Sesión</button>
                        ) : (
                            <Link to="/Login" className="active-link">Iniciar Sesión</Link>
                        )}
                    </div>
                </nav>
                <h1>Donaciones</h1>
                <h3>Personas que necesitan donaciones</h3>
                <div className="contenedorImgDonaciones">
                    {donacionesPersonasData.map((elemento) =>
                        <div key={elemento.nombre} className='contenedorImgIndividual'>
                            <img src={elemento.img}  alt="Retrato persona que requiere donación" className="estiloimgContenedor"/>
                            <div className="informacionDonacion">Nombre: {elemento.nombre}</div>
                            <div className="informacionDonacion">Direccion: {elemento.direccion}</div>
                            <div className="informacionDonacion">Telefono: {elemento.telefono}</div>
                            <div className="informacionDonacion">Correo: {elemento.correo}</div>
                        </div>
                    )}
                </div>
                <h3>Hospitales que necesitan donaciones</h3>
                <div className="contenedorImgDonaciones">
                    {donacionesHospitalesData.map((elemento) =>
                        <div key={elemento.nombre} className='contenedorImgIndividual'>
                            <img src={elemento.img} alt="Imagen hospital que requiere donación" className="estiloimgContenedor"/>
                            <div className="informacionDonacion">Nombre: {elemento.nombre}</div>
                            <div className="informacionDonacion">Telefono: {elemento.telefono}</div>
                            <div className="informacionDonacion">Direccion: {elemento.direccion}</div>
                            <img src={elemento.correo} alt="Imagen Ubicación del hospital" className="estiloimgContenedor"/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Donaciones;
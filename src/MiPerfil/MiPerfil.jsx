import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";
import UsuarioEliminado from "../Popups/UsuarioEliminado"
import UsuarioNoEliminado from "../Popups/UsuarioNoEliminado"
import UsuarioModificado from "../Popups/UsuarioModificado"
import UsuarioNoModificado from "../Popups/UsuarioNoModificado"

function Perfil(params) {


    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const correoDonante = window.localStorage.getItem("Usuario")

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

    const [anexoData, setDataAnexo] = useState({
        correo: window.localStorage.getItem("Usuario"),
        nombre: '',
        apellidos: '',
        telefono: '',
        tipoDeSangre: '',
        enfermedades: ''
    })

    const datosAnexos = (evento) => {
        const { name, value } = evento.target;
        setDataAnexo({
            ...anexoData,
            [name]: value
        })
    }

    const obtenerPerfil = async () => {
        try {
            const response = await axios.get("http://localhost:4567/miPerfil", { params: { correoDonante: correoDonante } });
            console.log(response.data)
            setDataAnexo(response.data);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        obtenerPerfil()
    }, [])

    const eliminarPerfil = async () => {
        try {
            const response = await axios.delete("http://localhost:4567/eliminarPerfil", { params: { correo: correoDonante } });
            console.log(response.data)
            if (response.data == "Perfil Eliminado") {
                abrirPopup()
                window.localStorage.clear()
                navigate("/")
            } else
                abrirPopUpError()
        } catch (error) {
            abrirPopUpError()
            console.error(error);
        }
    };

    const [mostrarPopup, setMostrarPopup] = useState(false);
    const abrirPopup = () => {
        setMostrarPopup(true);
    }

    const [mostrarErrorPopup, setMostrarErrorPopup] = useState(false);
    const abrirPopUpError = () => {
        setMostrarErrorPopup(true);
    }

    const [mostrarPopupMod, setMostrarPopupMod] = useState(false);
    const abrirPopupMod = () => {
        setMostrarPopupMod(true);
    }

    const [mostrarErrorPopupMod, setMostrarErrorPopupMod] = useState(false);
    const abrirPopUpErrorMod = () => {
        setMostrarErrorPopupMod(true);
    }

    const modificarPerfil = async () => {
        try {
            const response = await axios.get("http://localhost:4567/modificarPerfil", { params: { correo: correoDonante, nombre: anexoData.nombre, apellidos: anexoData.apellidos, telefono: anexoData.telefono, tipoDeSangre: anexoData.tipoDeSangre, enfermedades: anexoData.enfermedades } });
            console.log(response.data)
            if (response.data == "Informacion Modificada")
                abrirPopupMod()
            else
                abrirPopUpErrorMod()    
        } catch (error) {
            abrirPopUpErrorMod()
            console.error(error);
        }
    };

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
                        <button onClick={handleLogout} className='active-link'>Cerrar Sesión</button>
                    ) : (
                        <Link to="/Login" className="active-link">Iniciar Sesión</Link>
                    )}
                </div>
            </nav>
            <div className="perfil-container">
                <h1>Mi Perfil</h1>

                <div className="form-container">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={anexoData.nombre}
                        name="nombre"
                        onChange={datosAnexos}
                        placeholder="Ingrese su nombre"
                    />

                    <label htmlFor="apellido">Apellido:</label>
                    <input
                        type="text"
                        id="apellido"
                        value={anexoData.apellidos}
                        name="apellidos"
                        onChange={datosAnexos}
                        placeholder="Ingrese su apellido"
                    />

                    <label htmlFor="telefono">Teléfono:</label>
                    <input
                        type="text"
                        id="telefono"
                        value={anexoData.telefono}
                        name="telefono"
                        onChange={datosAnexos}
                        placeholder="Ingrese su teléfono"
                    />

                    <label htmlFor="tipoSangre">Tipo de Sangre:</label>
                    <input
                        type="text"
                        id="tipoSangre"
                        value={anexoData.tipoDeSangre}
                        name="tipoDeSangre"
                        onChange={datosAnexos}
                        placeholder="Ingrese su tipo de sangre"
                    />

                    <label htmlFor="enfermedades">Enfermedades:</label>
                    <textarea
                        id="enfermedades"
                        value={anexoData.enfermedades}
                        name="enfermedades"
                        onChange={datosAnexos}
                        placeholder="¿Tiene alguna enfermedad?"
                    />
                </div>
                <button className="botonSesionRegistro" onClick={eliminarPerfil}>Eliminar</button>
                <button className="botonSesionRegistro" onClick={modificarPerfil}>Modificar</button>
                <Box m={5}>
                    {mostrarPopup && <UsuarioEliminado onClose={() => setMostrarPopup(false)} />}
                </Box>

                <Box m={5}>
                    {mostrarErrorPopup && <UsuarioNoEliminado onClose={() => setMostrarErrorPopup(false)} />}
                </Box>
                <Box m={5}>
                    {mostrarPopupMod && <UsuarioModificado onClose={() => setMostrarPopupMod(false)} />}
                </Box>

                <Box m={5}>
                    {mostrarErrorPopupMod && <UsuarioNoModificado onClose={() => setMostrarErrorPopupMod(false)} />}
                </Box>
            </div>
        </>
    )
}

export default Perfil;
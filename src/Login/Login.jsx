// import {Button, TextField, Box} from "@mui/material";
import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import LoginExitoso from "../Popups/LoginExitoso.jsx"
import LoginNoExitoso from "../Popups/LoginNoExitoso.jsx"
function Login() {
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const [datosFormulario, setDatosFormulario] = useState({
        correo: '',
        contrasena: ''
    })
    window.localStorage.clear();
    const peticionLogin = async () => {
        try {
            const respuesta = await axios.post("http://localhost:4567/validar", datosFormulario);
            console.log("Respuesta de peticion: " + respuesta);
            return respuesta;
        } catch (error) {
            throw error;
        }
    }

    const [mostrarPopup, setMostrarPopup] = useState(false);
    const abrirPopup = () => {
        setMostrarPopup(true);
    }

    const [mostrarErrorPopup, setMostrarErrorPopup] = useState(false);
    const abrirPopUpError = () => {
        setMostrarErrorPopup(true);
    }

    const procesarFormulario = async (evento) => {
        evento.preventDefault();
        console.log("datos recuperados del formulario: ", datosFormulario);
        try {
            const respuesta = await peticionLogin();
            console.log("Respuesta de LOGIN: ", respuesta.data);
            if (respuesta.data === 'Usuario correcto') {
                abrirPopup()
                navigate("/")
                window.localStorage.setItem('Usuario', datosFormulario.correo);
            } else {
                abrirPopUpError()
            }
        } catch (error) {
            setCargando(false);
        }
    }

    const cambiosFormulario = (evento) => {
        const { name, value } = evento.target;
        setDatosFormulario({
            ...datosFormulario,
            [name]: value
        })
    }

    return (
        <>
            <div className="ContenedorLogin">
                <div className="contenedorImgLogin">
                    <div className='posicionImgLogin'>
                        <img src="./Imagenes/Logo.webp" alt="Logo sangre segura"></img>
                    </div>
                </div>
                <div className="contenedorDatosLogin">
                    <h1 className="titleLogin">Inicie Sesión</h1>

                    <form action="" onSubmit={procesarFormulario}>

                        <div className="alejarTituloLogin">
                            <input type="text" className="textFieldDatosLogin" placeholder="Correo" onChange={cambiosFormulario} name='correo' />
                        </div>
                        <input type="password" className="textFieldDatosLogin" placeholder="Contraseña" onChange={cambiosFormulario} name='contrasena' />
                        <Link to="/Registro" className='link_SingUp'>Registrate</Link>
                        <input type="submit" value="Iniciar Sesión" className="botonSesionLogin" disabled={cargando} />
                        <Box m={5}>
                            {mostrarPopup && <LoginExitoso onClose={() => setMostrarPopup(false)} />}
                        </Box>

                        <Box m={5}>
                            {mostrarErrorPopup && <LoginNoExitoso onClose={() => setMostrarPopup(false)} />}
                        </Box>
                    </form>
                </div>

                <div className="image_login_container">
                </div>

            </div>


        </>
    );
}
export default Login;
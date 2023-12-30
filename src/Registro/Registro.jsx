import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import RegistroRealizado from '../Popups/RegistroRealizado';
import RegistroNoRealizado from '../Popups/RegistroNoRealizado';

const Registro = () => {
  const [cargando, setCargando] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
    contrasena: ''
  });

  const hacerPeticion = async () => {
    try {
      const respuesta = await axios.post("http://localhost:4567/registro", datosFormulario);
      console.log(respuesta.data);
      return respuesta.data;
    } catch (error) {
      throw error;
    }
  }

  const procesarFormulario = async (evento) => {
    evento.preventDefault();
    console.log("Datos recuperados del formulario: ", datosFormulario);
    setCargando(true);
    try {
      const respuesta = await hacerPeticion();
      setCargando(false);
      if (respuesta === 'usuario agregado') {
        abrirPopup()
      } else {
        abrirPopUpError()
      }
    } catch (error) {
      console.log(error)
      setCargando(false);
    }
  }

  const cambiosFormulario = (evento) => {
    const { name, value } = evento.target;
    // console.log(name)
    // console.log(value)
    setDatosFormulario({
      ...datosFormulario,
      [name]: value
    })
  }

  const [mostrarPopup, setMostrarPopup] = useState(false);
  const abrirPopup = () => {
    setMostrarPopup(true);
  }

  const [mostrarErrorPopup, setMostrarErrorPopup] = useState(false);
  const abrirPopUpError = () => {
    setMostrarErrorPopup(true);
  }

  return (
    <div className="contenedorRegistro">
      <div className="contenedorImgRegistro">
        <div className='posicionImgRegisstro'>
          <img src='./Imagenes/Logo2.png'></img>
        </div>
      </div>
      <div className="Signup_container">
        <h1 className="titleRegistro">Bienvenido</h1>
        <h1 className="titleRegistro">Favor de registrarse</h1>

        <form action="" onSubmit={procesarFormulario}>
          <div className="apartarTituloRegistro">
            <input type="text" placeholder="Nombre" required className='textFieldDatosRegistro' name='nombre' onChange={cambiosFormulario} />
          </div>
          <input type="text" placeholder="Apellidos" required className='textFieldDatosRegistro' name='apellidos' onChange={cambiosFormulario} />
          <input type="text" placeholder="Telefono" required className='textFieldDatosRegistro' name='telefono' onChange={cambiosFormulario} />
          <input type="email" placeholder="Correo Electrónico" required className='textFieldDatosRegistro' name='correo' onChange={cambiosFormulario} />
          <input type="password" name="contrasena" id="contrasena" required placeholder="Contraseña" className='textFieldDatosRegistro' onChange={cambiosFormulario} />
          <Link to="/Login" className='link_Login'>Iniciar Sesión</Link>
          <input type="submit" value="Registrarte" className='botonSesionRegistro' disabled={cargando} />
          <Box m={5}>
           { mostrarPopup && <RegistroRealizado onClose={()=> setMostrarPopup(false)}/>}
            </Box>

            <Box m={5}>
           { mostrarErrorPopup && <RegistroNoRealizado onClose={()=> setMostrarPopup(false)}/>}
            </Box>
        </form>
      </div>
    </div>
  );
}

export default Registro;

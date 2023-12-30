import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'

import Login from "./Login/Login.jsx"
import Registro from './Registro/Registro.jsx'
import Principal from './Principal/Principal.jsx'
import Donaciones from './Donaciones/Donaciones.jsx'
import Donantes from './Donantes/donantes.jsx'
import Perfil from './MiPerfil/MiPerfil.jsx'

const router = createHashRouter([
  {
    path: "/",
    element: <Principal/>
  },
  {
    path: "Registro",
    element: <Registro/>
  },
  {
    path: "Login",
    element: <Login/>
  },
  {
    path: "Donaciones",
    element: <Donaciones/>
  },
  {
    path: "Donantes",
    element: <Donantes/>
  },
  {
    path: "Perfil",
    element: <Perfil/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)

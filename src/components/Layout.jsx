import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavbarUnificado from '../components/NavbarUnificado';

const Layout = () => {
  const location = useLocation();

  // Configuración de rutas
  const routeConfig = {
    "/areas-comunes": {
      title: "Áreas Comunes",
      showVenta: true,
      showPregunta: true,
      showRegistro: false,
      showLogin: false,
    },
    "/paginaventas": {
      title: "Página de Ventas",
      showVenta: true,
      showPregunta: true,
      showRegistro: false,
      showLogin: false,
    },
    "/estacionamiento": {
      title: "Estacionamiento",
      showVenta: true,
      showPregunta: true,
      showRegistro: false,
      showLogin: false,
    },
    "/paginainicial": {
      title: "Página Inicial",
      showVenta: true,
      showPregunta: true,
      showRegistro: false,
      showLogin: false,
    },
    "/login": {
      title: "",
      showVenta: false,
      showPregunta: false,
      showRegistro: true,
      showLogin: true,
    },
    "/registro": {
      title: "",
      showVenta: false,
      showPregunta: false,
      showRegistro: true,
      showLogin: true,
    },
    "/tusventas": {
      title: "Tus Ventas",
      showVenta: true,
      showPregunta: true,
      showRegistro: false,
      showLogin: false,
    },
    "/vistahacerunpost": {
      title: "Nueva Pregunta",
      showVenta: true,
      showPregunta: true,
      showRegistro: false,
      showLogin: false,
    },
    "/vistahacerunaventa": {
      title: "Nueva Venta",
      showVenta: true,
      showPregunta: true,
      showRegistro: false,
      showLogin: false,
    },
    "/tuspreguntas": {
      title: "Tus Preguntas",
      showVenta: true,
      showPregunta: true,
      showRegistro: false,
      showLogin: false,
    },
    "/gastoscomunes": {
      title: "Finanzas",
      showVenta: true,
      showPregunta: true,
      showRegistro: false,
      showLogin: false,
    },
  };

  const currentRoute = routeConfig[location.pathname] || {
    title: "Título por Defecto",
    showVenta: false,
    showPregunta: false,
    showRegistro: false,
    showLogin: false,
  };

  return (
    <>
      <NavbarUnificado
        title={currentRoute.title}
        showVenta={currentRoute.showVenta}
        showPregunta={currentRoute.showPregunta}
        showRegistro={currentRoute.showRegistro}
        showLogin={currentRoute.showLogin}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

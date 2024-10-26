import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Menu as MenuIcon, QuestionAnswer as QuestionAnswerIcon, ShoppingCart as ShoppingCartIcon, DirectionsCar as DirectionsCarIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Importamos el hook para navegar
import "./Menu.css";

const Sidebar = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el sidebar está abierto o cerrado
  const navigate = useNavigate(); // Hook para manejar la navegación

  // Función para alternar la apertura/cierre del sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Funciones de navegación
  const goToEstacionamiento = () => navigate("/estacionamiento");
  const goToPreguntas = () => navigate("/paginainicial");
  const goToVentas = () => navigate("/paginaventas");
  const goToTusVentas = () => navigate("/tusventas");
  const goToTusPreguntas = () => navigate("/tuspreguntas");
  const handleLogout = () => {
    // Lógica para cerrar sesión (limpieza de tokens, redirección al login, etc.)
    console.log("Sesión cerrada");
    navigate("/login");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""} ${className}`}>
      <IconButton onClick={toggleSidebar} className="menu-toggle-btn">
        <MenuIcon />
      </IconButton>
      <div className="sidebar-content">
        <div className={`title16 ${!isOpen ? "hidden" : ""}`}>MENU</div>
        <List>
          <ListItem button onClick={goToPreguntas}>
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Preguntas" />}
          </ListItem>
          <ListItem button onClick={goToVentas}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Ventas" />}
          </ListItem>
          <ListItem button onClick={goToEstacionamiento}>
            <ListItemIcon>
              <DirectionsCarIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Estacionamiento" />}
          </ListItem>
        </List>
        <div className={`title17 ${!isOpen ? "hidden" : ""}`}>NAVEGADOR PERSONAL</div>
        <List>
          <ListItem button onClick={goToTusVentas}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Tus Ventas" />}
          </ListItem>
          <ListItem button onClick={goToTusPreguntas}>
            <ListItemIcon>
              <QuestionAnswerIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Tus Preguntas" />}
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            {isOpen && <ListItemText primary="Cerrar Sesión" />}
          </ListItem>
        </List>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Menu"; // Importa el menú modificado
import RightPanel2 from "../components/RightPanel2"; // Importa el panel derecho
import "./AreasComunes.css";

const AreasComunes = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Datos de las áreas comunes
  const areas = [
    { id: 1, nombre: "Áreas Recreativas", imagen: "/sala-de-nios@2x.png" },
    { id: 2, nombre: "Áreas Saludables", imagen: "/gym@2x.png" },
    { id: 3, nombre: "Áreas Comunitarias", imagen: "/sala-de-lavanderia@2x.png" },
  ];

  // Función para alternar la apertura/cierre del sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="areas-comunes">
      {/* Contenedor principal que envuelve el contenido */}
      <div className="layout-container">
        {/* Sidebar a la izquierda */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className={isSidebarOpen ? "open" : ""} />

        {/* Contenedor del contenido principal */}
        <div className="main-content">
          <div className="amenities">
            {areas.map((area) => (
              <div key={area.id} className="amenity">
                <div className="amenity-details">
                  <div className="title5">{area.nombre}</div>
                  <img className="area-icon" loading="lazy" alt={area.nombre} src={area.imagen} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel derecho con clase fija */}
        <div className="right-panel-container">
          <RightPanel2 />
        </div>
      </div>
    </div>
  );
};

export default AreasComunes;

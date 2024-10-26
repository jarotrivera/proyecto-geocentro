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
      <main className="content1">
        {/* Contenedor padre que envuelve el Sidebar, el contenido principal y el panel derecho */}
        <div className={`layout-container`}>
          {/* Sidebar a la izquierda */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} className={isSidebarOpen ? "open" : ""} />

          {/* Contenedor del contenido principal */}
          <section className="main-content">
            <div className="amenities">
              <div className="amenities-list">
                {areas.map((area) => (
                  <div key={area.id} className="amenity">
                    <div className="amenity-details">
                      <div className="title5">{area.nombre}</div>
                      <img
                        className="area-icon"
                        loading="lazy"
                        alt={area.nombre}
                        src={area.imagen}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Panel derecho con clase fija */}
          <div className="right-panel">
            <RightPanel2 />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AreasComunes;

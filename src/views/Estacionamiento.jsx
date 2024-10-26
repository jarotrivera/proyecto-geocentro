import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Menu";
import RightPanel2 from "../components/RightPanel2";
import "./Estacionamiento.css"; // Asegúrate de crear este archivo CSS

const Estacionamiento = () => {
  // Estado para controlar si los espacios están ocupados o libres
  const [espacios, setEspacios] = useState([
    { id: 1, ocupado: false },
    { id: 2, ocupado: false },
    { id: 3, ocupado: false },
  ]);

  // Función para actualizar el estado de los espacios
  const actualizarEstadoEspacios = async () => {
    try {
      const response = await fetch('http://IP_DEL_ESP32'); // Reemplaza con la IP de tu ESP32
      const data = await response.json();

      // Supongamos que el ESP32 retorna el estado de cada espacio
      setEspacios(prevEspacios =>
        prevEspacios.map(espacio => ({
          ...espacio,
          ocupado: data.estado === 'ocupado' // Asegúrate de adaptar esto a la lógica de tu sensor
        }))
      );
    } catch (error) {
      console.error('Error al obtener el estado de los espacios:', error);
    }
  };

  useEffect(() => {
    // Llamar a la función para obtener el estado de los espacios cada 5 segundos
    const interval = setInterval(actualizarEstadoEspacios, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pagina-inicial">
      <div className="content4">
        <Sidebar />
        <section className="main-content">
          <div className="posts-container">
            <div className="estacionamiento-container">
              {espacios.map(espacio => (
                <div
                  key={espacio.id}
                  className={`espacio ${espacio.ocupado ? 'ocupado' : 'libre'}`}
                >
                  Espacio {espacio.id}
                </div>
              ))}
            </div>
          </div>
        </section>
        <RightPanel2 /> {/* Panel derecho */}
      </div>
    </div>
  );
};

export default Estacionamiento;

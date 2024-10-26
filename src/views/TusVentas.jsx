import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "../components/Menu";
import RightPanel2 from "../components/RightPanel2";
import "./TusVentas.css";

const TusVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVentas = async () => {
      setLoading(true); // Iniciar el estado de carga
      try {
        const response = await fetch('/api/ventas');
        if (!response.ok) {
          throw new Error('Error al obtener las ventas');
        }
        const data = await response.json();
        setVentas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };

    fetchVentas();
  }, []);

  if (loading) {
    return <p>Cargando ventas...</p>; // Mensaje de carga
  }

  return (
    <div className="tus-ventas">
      <section className="main-content">
        <div className="sidebar-parent">
          <div className="sidebar1">
            <Menu /> 
          </div>
          <div className="content">
            {error ? (
              <p>{error}</p> // Mensaje de error
            ) : ventas.length > 0 ? (
              ventas.map((venta) => (
                <div key={venta.id} className="venta-item">
                  <div className="venta-item-foto">
                    <img src={venta.foto} alt={venta.titulo} />
                  </div>
                  <div className="venta-item-info">
                    <h3>{venta.titulo}</h3>
                    <p>{venta.descripcion}</p>
                    <p className="precio">Precio: ${venta.precio}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No tienes ventas publicadas.</p>
            )}
          </div>
        </div>
        <RightPanel2 /> {/* Agrega el panel derecho aquí */}
      </section>
    </div>
  );
};

export default TusVentas;

import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Menu";
import RightPanel2 from "../components/RightPanel2";
import "./PaginaVentas.css";

const PaginaVentas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    // Función para obtener las ventas desde el backend
    const fetchVentas = async () => {
      try {
        const response = await fetch('URL_DEL_BACKEND'); // Reemplaza con la URL de tu backend
        const data = await response.json();
        setVentas(data);
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      }
    };

    fetchVentas();
  }, []); // El array vacío asegura que solo se ejecute al montar el componente

  return (
    <div className="pagina-ventas">
      <div className="content5">
        <Sidebar />
        <section className="main-content1">
          <div className="feed">
            {ventas.length > 0 ? (
              ventas.map((venta, index) => (
                <div key={index} className="post-full1">
                  <div className="venta-bloque">
                    <div className="user-info1">
                      <div className="user-avatar">
                        <img
                          className="ava-icon1"
                          loading="lazy"
                          alt="Avatar"
                          src={venta.avatarUrl} // URL del avatar
                        />
                        <div className="nikcname1">{venta.nickName}</div>
                      </div>
                      <h3 className="ventas-de-queques2">{venta.titulo}</h3>
                    </div>
                    <div className="post-images1">
                      <img
                        className="queque-facil-15190-orig-1-icon1"
                        loading="lazy"
                        alt="Producto"
                        src={venta.imagenUrl} // URL de la imagen del producto
                      />
                    </div>
                    <div className="post-content1">
                      <p className="posuere-arcu-arcu1">{venta.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-ventas-message">No hay ventas disponibles.</p>
            )}
          </div>
        </section>
        <RightPanel2 className="right-sidebar" />
      </div>
    </div>
  );
};

export default PaginaVentas;

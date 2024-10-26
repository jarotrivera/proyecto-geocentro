import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Menu";
import RightPanel2 from "../components/RightPanel2";
import "./PaginaInicial.css";

const PaginaInicial = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      setLoading(true); // Inicia el estado de carga
      try {
        const response = await fetch('URL_DEL_BACKEND'); // Reemplaza con la URL de tu backend
        if (!response.ok) {
          throw new Error('Error al obtener las publicaciones'); // Manejo de errores si la respuesta no es OK
        }
        const data = await response.json();
        setPublicaciones(data);
      } catch (error) {
        setError(error.message); // Guarda el mensaje de error
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchPublicaciones();
  }, []); // El array vacío asegura que solo se ejecute al montar el componente

  if (loading) {
    return <p>Cargando publicaciones...</p>; // Mensaje de carga
  }

  return (
    <div className="pagina-inicial">
      <div className="content4">
        <Sidebar />
        <section className="main-content">
          <div className="posts-container">
            <div className="posts">
              {error ? (
                <p>{error}</p> // Mensaje de error
              ) : publicaciones.length > 0 ? (
                publicaciones.map((publicacion) => (
                  <div key={publicacion.id} className="post"> {/* Utiliza un id único aquí */}
                    <div className="user-info">
                      <div className="user-avatar-container">
                        <img
                          className="ava-icon"
                          loading="lazy"
                          alt="Avatar"
                          src={publicacion.avatarUrl} // URL del avatar
                        />
                        <div className="page-title-container">
                          <div className="user-credentials-container">
                            <div className="nickname">{publicacion.nickName}</div>
                          </div>
                        </div>
                      </div>
                      <h3 className="post-title">{publicacion.titulo}</h3>
                    </div>
                    <div className="post-content">
                      <p>{publicacion.descripcion}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay publicaciones disponibles.</p>
              )}
            </div>
          </div>
        </section>
        <RightPanel2 />
      </div>
    </div>
  );
};

export default PaginaInicial;

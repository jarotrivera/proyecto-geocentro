import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "../components/Menu";
import RightPanel2 from "../components/RightPanel2"; // Importa el panel derecho
import "./TusPreguntas.css";

const TusPreguntas = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreguntas = async () => {
      setLoading(true); // Inicia el estado de carga
      try {
        const response = await fetch('URL_DEL_BACKEND'); // Reemplaza con la URL de tu backend
        if (!response.ok) {
          throw new Error('Error al obtener las preguntas'); // Manejo de errores si la respuesta no es OK
        }
        const data = await response.json();
        setPreguntas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Finaliza el estado de carga
      }
    };

    fetchPreguntas();
  }, []); // El array vacío asegura que solo se ejecute al montar el componente

  if (loading) {
    return <p>Cargando preguntas...</p>; // Mensaje de carga
  }

  return (
    <div className="tus-preguntas1">
      <section className="main-content">
        <div className="sidebar-parent">
          <div className="sidebar1">
            <Menu /> 
          </div>
          <div className="posts">
            <div className="post-list">
              {error ? (
                <p>{error}</p> // Mensaje de error
              ) : preguntas.length > 0 ? (
                preguntas.map((pregunta) => (
                  <div key={pregunta.id} className="post"> {/* Utiliza un id único aquí */}
                    <div className="user-info">
                      <div className="user-avatar-container">
                        <img
                          className="ava-icon"
                          loading="lazy"
                          alt="Avatar"
                          src={pregunta.avatarUrl} // URL del avatar
                        />
                        <div className="page-title-container">
                          <div className="user-credentials-container">
                            <div className="nickname">{pregunta.nickName}</div>
                          </div>
                        </div>
                      </div>
                      <h3 className="post-title">{pregunta.titulo}</h3>
                    </div>
                    <div className="post-content">
                      <p>{pregunta.descripcion}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay preguntas disponibles.</p>
              )}
            </div>
          </div>
        </div>
        <RightPanel2 /> {/* Panel derecho */}
      </section>
    </div>
  );
};

export default TusPreguntas;

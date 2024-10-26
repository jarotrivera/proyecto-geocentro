import React, { useState } from "react";
import Sidebar from "../components/Menu";
import RightPanel2 from "../components/RightPanel2";
import "./VistaHacerUnaVenta.css";

const VistaHacerUnaVenta = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [foto, setFoto] = useState(null);

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar la publicación de venta
  };

  return (
    <div className="vista-hacer-una-venta">
      <Sidebar />
      <div className="content2">
        <section className="main-panel">
          <div className="formulario-wrapper">
            <div className="formulario-container">
              <form className="formulario-venta" onSubmit={handleSubmit}>
                <div>
                  <label>Título</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Descripción</label>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Precio</label>
                  <input
                    type="number"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Foto</label>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <button type="submit">Publicar Venta</button>
              </form>
            </div>
          </div>
        </section>
        <RightPanel2 />
      </div>
    </div>
  );
};

export default VistaHacerUnaVenta;

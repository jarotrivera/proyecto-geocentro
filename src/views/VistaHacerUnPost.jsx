import React, { useState } from 'react';
import Sidebar from "../components/Menu";
import RightPanel2 from "../components/RightPanel2";
import "./VistaHacerUnPost.css";

const VistaHacerUnPost = () => {
  const [titulo, setTitulo] = useState('');
  const [foto, setFoto] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nuevoPost = {
        titulo,
        foto,
        descripcion,
      };

      // Enviar los datos al backend
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPost),
      });

      if (!response.ok) {
        throw new Error('Error al crear la publicación');
      }

      const data = await response.json();
      console.log('Publicación creada:', data);

      // Limpiar los campos del formulario
      setTitulo('');
      setFoto('');
      setDescripcion('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="vista-hacer-un-post">
      <main className="content">
        <Sidebar />
        <section className="main-panel">
          <div className="form-wrapper">
            <div className="form-container">
              <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                  <label>Título:</label>
                  <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Foto:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {foto && (
                    <div className="photo-preview">
                      <img src={foto} alt="Vista previa" />
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label>Descripción:</label>
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Agregar Publicación</button>
              </form>
            </div>
          </div>
        </section>
        <RightPanel2 />
      </main>
    </div>
  );
};

export default VistaHacerUnPost;

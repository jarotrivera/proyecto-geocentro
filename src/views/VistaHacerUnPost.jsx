import React, { useState, useEffect } from 'react';
import Sidebar from "../components/Menu";
import RightPanel2 from "../components/RightPanel2";
import "./VistaHacerUnPost.css";

const VistaHacerUnPost = () => {
  const [titulo, setTitulo] = useState('');
  const [foto, setFoto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoPost = { titulo, foto, descripcion };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPost),
      });

      if (!response.ok) throw new Error('Error al agregar la publicación');

      const addedPost = await response.json();
      setPosts([...posts, addedPost]);
      setTitulo('');
      setFoto('');
      setDescripcion('');
    } catch (error) {
      console.error("Error al enviar la publicación:", error);
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
          <div className="posts-list">
            {posts.map((post, index) => (
              <div key={index} className="post-item">
                {post.foto && (
                  <div className="post-item-photo">
                    <img src={post.foto} alt={post.titulo} />
                  </div>
                )}
                <div className="post-item-info">
                  <h2>{post.titulo}</h2>
                  <p>{post.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <RightPanel2 />
      </main>
    </div>
  );
};

export default VistaHacerUnPost;

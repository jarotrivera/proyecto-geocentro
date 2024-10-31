import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Menu";
import RightPanel2 from "../components/RightPanel2";
import "./PaginaInicial.css";
import { IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const PaginaInicial = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Error al obtener las publicaciones');

        const data = await response.json();
        setPublicaciones(data.reverse());
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicaciones();
  }, []);

  const handleMenuOpen = (event, post) => {
    setAnchorEl(event.currentTarget);
    setEditPostId(post.id);
    setEditTitle(post.titulo);
    setEditDescription(post.descripcion);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openEditModal = () => {
    setEditModalOpen(true);
    handleMenuClose();
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditPostId(null);
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${editPostId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          titulo: editTitle,
          descripcion: editDescription
        })
      });
      if (!response.ok) throw new Error('Error al editar la publicación');

      setPublicaciones((prev) =>
        prev.map((post) =>
          post.id === editPostId
            ? { ...post, titulo: editTitle, descripcion: editDescription }
            : post
        )
      );
      closeEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${editPostId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) throw new Error('Error al eliminar la publicación');

      setPublicaciones((prev) => prev.filter((post) => post.id !== editPostId));
    } catch (error) {
      console.error(error);
    } finally {
      handleMenuClose();
    }
  };

  if (loading) return <p>Cargando publicaciones...</p>;

  return (
    <div className="pagina-inicial">
      <div className="content4">
        <Sidebar />
        <section className="main-content">
          <div className="posts-container">
            <div className="posts">
              {error ? (
                <p>{error}</p>
              ) : publicaciones.length > 0 ? (
                publicaciones.map((publicacion) => (
                  <div key={publicacion.id} className="post">
                    <div className="post-header">
                      <div className="user-avatar-container">
                        <img
                          className="ava-icon"
                          loading="lazy"
                          alt="Avatar"
                          src={publicacion.avatarUrl || "/perfiluser.png"}
                        />
                        <div className="user-info">
                          <div className="nickname">{publicacion.nickName || 'Usuario'}</div>
                          <h3 className="post-title">{publicacion.titulo}</h3>
                        </div>
                      </div>
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(e) => handleMenuOpen(e, publicacion)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={openEditModal}>Editar Publicación</MenuItem>
                        <MenuItem onClick={handleDelete}>Eliminar Publicación</MenuItem>
                      </Menu>
                    </div>
                    <div className="post-content">
                      <p>{publicacion.descripcion}</p>
                      {publicacion.foto && (
                        <div className="post-image">
                          <img src={publicacion.foto} alt="Imagen de la publicación" />
                        </div>
                      )}
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

      <Dialog open={editModalOpen} onClose={closeEditModal}>
        <DialogTitle>Editar Publicación</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Descripción"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PaginaInicial;

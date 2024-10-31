// controllers/postController.js
const Post = require('../models/postModel');
const User = require('../models/userModel');

// Obtener todas las publicaciones
const getPosts = async (req, res) => {
  try {
    console.log("Intentando obtener publicaciones...");
    const posts = await Post.findAll({
      include: {
        model: User,
        as: 'User',
        attributes: ['nombre'],
      },
    });
    console.log("Publicaciones obtenidas:", posts);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
    res.status(500).json({ message: "Error al obtener las publicaciones", error });
  }
};

// Crear una publicación
const createPost = async (req, res) => {
  const { titulo, foto, descripcion } = req.body;
  const usuarioId = req.userId; // Asumiendo que `userId` viene del middleware de autenticación

  try {
    const newPost = await Post.create({
      titulo,
      foto,
      descripcion,
      usuarioId,
    });
    res.status(201).json({ message: 'Publicación creada exitosamente', newPost });
  } catch (error) {
    console.error('Error al crear la publicación:', error);
    res.status(500).json({ message: 'Error al crear la publicación', error });
  }
};

// Editar una publicación
const editPost = async (req, res) => {
  const { titulo, descripcion } = req.body;
  const postId = req.params.id;
  const usuarioId = req.userId;

  try {
    const post = await Post.findByPk(postId);

    if (!post || post.usuarioId !== usuarioId) {
      return res.status(403).json({ message: 'No tienes permiso para editar esta publicación' });
    }

    post.titulo = titulo || post.titulo;
    post.descripcion = descripcion || post.descripcion;
    await post.save();

    res.status(200).json({ message: 'Publicación actualizada correctamente', post });
  } catch (error) {
    console.error('Error al editar la publicación:', error);
    res.status(500).json({ message: 'Error al editar la publicación', error });
  }
};

// Eliminar una publicación
const deletePost = async (req, res) => {
  const postId = req.params.id;
  const usuarioId = req.userId;

  try {
    const post = await Post.findByPk(postId);

    if (!post || post.usuarioId !== usuarioId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta publicación' });
    }

    await post.destroy();
    res.status(200).json({ message: 'Publicación eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la publicación:', error);
    res.status(500).json({ message: 'Error al eliminar la publicación', error });
  }
};

module.exports = { createPost, getPosts, editPost, deletePost };

const Post = require('../models/postModel');
const User = require('../models/userModel');
const sharp = require('sharp');

// Obtener todas las publicaciones con paginación
const getPosts = async (req, res) => {
  try {
    console.log("Intentando obtener publicaciones...");
    
    const page = parseInt(req.query.page) || 1; // Página actual desde el query
    const limit = 10; // Limita a 10 publicaciones por página
    const offset = (page - 1) * limit;

    const { count, rows: posts } = await Post.findAndCountAll({
      limit,
      offset,
      include: {
        model: User,
        as: 'usuario', // Cambiado a 'usuario' para coincidir con el alias en server.js
        attributes: ['nombre'], // Incluye solo el nombre del usuario
      },
    });

    const totalPages = Math.ceil(count / limit);
    const postsWithUsernames = posts.map(post => ({
      id: post.id,
      titulo: post.titulo,
      foto: post.foto,
      descripcion: post.descripcion,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      usuarioNombre: post.usuario ? post.usuario.nombre : 'Usuario desconocido',
    }));

    console.log("Publicaciones obtenidas:", postsWithUsernames);
    res.status(200).json({
      data: postsWithUsernames,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
    res.status(500).json({ message: "Error al obtener las publicaciones", error });
  }
};

// Crear una publicación
const createPost = async (req, res) => {
  const { titulo, foto, descripcion } = req.body;
  const usuarioId = req.userId;

  try {
    let resizedImageBase64 = foto;

    // Redimensiona la imagen solo si 'foto' tiene contenido
    if (foto) {
      const buffer = Buffer.from(foto.split(",")[1], 'base64'); // Si foto está en formato base64
      const resizedImage = await sharp(buffer)
        .resize({ width: 800 }) // Ajusta el tamaño deseado
        .jpeg({ quality: 80 })  // Ajusta la calidad de la imagen
        .toBuffer();
      resizedImageBase64 = `data:image/jpeg;base64,${resizedImage.toString('base64')}`;
    }

    // Crear la publicación en la base de datos
    const newPost = await Post.create({
      titulo,
      foto: resizedImageBase64, // Guardar la imagen redimensionada en la base de datos
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

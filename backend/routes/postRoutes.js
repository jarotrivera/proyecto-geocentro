const express = require('express');
const { createPost, getPosts, editPost, deletePost, getUserPosts } = require('../controllers/postController');
const { authenticateUser } = require('../utils/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', authenticateUser, getPosts);
router.get('/user-posts', authenticateUser, (req, res, next) => {
  console.log("Ruta /user-posts llamada");
  next();
}, getUserPosts); // Nueva ruta para obtener las publicaciones del usuario
router.post('/', authenticateUser, upload.single('foto'), createPost); 
router.put('/:id', authenticateUser, editPost);
router.delete('/:id', authenticateUser, deletePost);

module.exports = router;

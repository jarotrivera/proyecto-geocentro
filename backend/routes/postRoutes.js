// routes/postRoutes.js
const express = require('express');
const { createPost, getPosts, editPost, deletePost } = require('../controllers/postController');
const { authenticateUser } = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authenticateUser, getPosts);
router.post('/', authenticateUser, createPost);
router.put('/:id', authenticateUser, editPost);
router.delete('/:id', authenticateUser, deletePost);

module.exports = router;

// models/postModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Post = sequelize.define('Post', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
});

// Definimos la relación: Una publicación pertenece a un usuario
Post.associate = (models) => {
  Post.belongsTo(models.User, { foreignKey: 'usuarioId', as: 'User' });
};

module.exports = Post;

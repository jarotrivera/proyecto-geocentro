// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

// Importar modelos para sincronizar las asociaciones
const User = require('./models/userModel');
const Post = require('./models/postModel');

// Configurar las asociaciones entre los modelos
User.hasMany(Post, { foreignKey: 'usuarioId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Aumenta el límite aquí

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Sincroniza la base de datos y levanta el servidor
sequelize.sync({ alter: true }).then(() => {
  console.log('Conexión a la base de datos exitosa');
  app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
  });
}).catch((error) => {
  console.error('Error al conectar con la base de datos:', error);
});

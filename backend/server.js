const express = require('express');
const cors = require('cors');
const sequelize = require('./models/db'); // Asegúrate de que db.js exporte tu instancia de Sequelize
const userRoutes = require('./routes/userRoutes'); // Ruta de usuario

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

// Iniciar servidor y conectar a la base de datos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
})();

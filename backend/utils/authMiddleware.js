// utils/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log("Encabezado de autorización recibido:", authHeader); // Log para verificar el encabezado

  if (!authHeader) {
    console.log("No se encontró encabezado de autorización");
    return res.status(401).json({ message: 'No autorizado, falta token' });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token extraído:", token); // Log para verificar el token extraído

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decodificado:", decoded); // Log para verificar el contenido del token

    req.userId = decoded.id;

    const user = await User.findByPk(req.userId);
    if (!user) {
      console.log("Usuario no encontrado en la base de datos");
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(401).json({ message: 'No autorizado, token inválido' });
  }
};

module.exports = { authenticateUser };

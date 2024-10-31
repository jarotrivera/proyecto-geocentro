// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    // Busca el usuario por nombre (o correo según la lógica)
    const user = await User.findOne({ where: { nombre } });

    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Genera el token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error en el proceso de login:', error);
    res.status(500).json({ message: 'Error en el proceso de login', error });
  }
};

module.exports = { login };

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuarios
const register = async (req, res) => {
  try {
    const { nombre, email, password, departamento } = req.body;
    
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) return res.status(400).json({ message: 'El correo ya está registrado' });

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const newUser = await User.create({ nombre, email, password: hashedPassword, departamento });
    res.status(201).json({ message: 'Usuario registrado correctamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error: error.message });
  }
};

// Login de usuarios
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    // Crear un token de JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error: error.message });
  }
};

module.exports = { register, login };

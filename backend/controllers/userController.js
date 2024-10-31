const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Post = require('../models/postModel');

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { nombre, email, password, departamento } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario
    const newUser = await User.create({
      nombre,
      email,
      password: hashedPassword,
      departamento,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función para manejar el inicio de sesión
const loginUser = async (req, res) => {
  const { nombre, password } = req.body;

  try {
    // Buscar al usuario por nombre
    const user = await User.findOne({ where: { nombre } });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.id, nombre: user.nombre }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Función para obtener todas las publicaciones
const getPosts = async (req, res) => {
  try {
    console.log("Intentando obtener publicaciones...");
    const posts = await Post.findAll({
      include: {
        model: User,
        as: 'usuario',
        attributes: ['nombre'],
      },
    });
    console.log("Publicaciones obtenidas:", posts);
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
    res.status(500).json({ message: "Error al obtener las publicaciones", error });
  }
};

module.exports = { registerUser, loginUser, getPosts };

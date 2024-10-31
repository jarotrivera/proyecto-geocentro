import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "./Login.css";

const Login = () => {
  // Estado para controlar los valores de los inputs
  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializar useNavigate

  // Función para manejar el cambio en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enviar los datos al backend
    console.log("Datos enviados:", formData);

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.usuario, // Coincidir con el campo de tu base de datos
          password: formData.contraseña,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Almacenar token en localStorage o redirigir al usuario
        console.log("Login exitoso:", data);
        localStorage.setItem('token', data.token); // Almacenar token en localStorage
        // Redirigir al usuario a la vista 'paginainicial'
        navigate("/paginainicial");
      } else {
        setError(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Ocurrió un error. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="login">
      <main className="content3">
        <div className="info-wrapper">
          <div className="info1">
            <h3 className="bienvenido-a-la">Bienvenido A la Comunidad</h3>
            <div className="geocentro-el-foro">
              Geocentro El Foro Privado De Nuestra Comunidad
            </div>
            <Form className="login-form" onSubmit={handleSubmit}>
              <Form.Group className="input-full">
                <Form.Label>Usuario</Form.Label>
                <Form.Control 
                  type="text" 
                  name="usuario" 
                  id="Usuario" 
                  placeholder="Usuario"
                  value={formData.usuario}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="input-full">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="contraseña"
                  id="Contraseña"
                  placeholder="Contraseña"
                  value={formData.contraseña}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button
                className="button-resize"
                name="Iniciar Sesion"
                id="IniciarSesion"
                variant="primary"
                type="submit"
              >
                Iniciar Sesión
              </Button>
            </Form>
          </div>
        </div>
        <img className="image-icon" alt="" src="/image@2x.png" />
      </main>
    </div>
  );
};

export default Login;
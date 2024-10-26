import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";

const Login = () => {
  // Estado para controlar los valores de los inputs
  const [formData, setFormData] = useState({
    usuario: "",
    contraseña: "",
  });

  const [error, setError] = useState("");

  // Función para manejar el cambio en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes añadir una lógica de validación si es necesario

    // Enviar los datos al backend
    console.log("Datos enviados:", formData);

    // Ejemplo usando fetch:
    // fetch("/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.error) {
    //     setError("Credenciales incorrectas");
    //   } else {
    //     // Redirigir a otra vista o almacenar token
    //     console.log("Login exitoso:", data);
    //   }
    // })
    // .catch(error => {
    //   console.error("Error:", error);
    //   setError("Ocurrió un error. Inténtalo nuevamente.");
    // });
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

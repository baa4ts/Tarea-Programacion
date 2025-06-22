import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./../components/UserAuth";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "./../styles/UserForm.css";

export const UserForm = ({ handle }) => {
  const navigate = useNavigate();

  const handleFormulario = async (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target));

    try {
      const { status, data } = await UserAuth(
        handle ? "login" : "register",
        datos
      );

      if (status === 201) {
        // Registro exitoso
        await Swal.fire({
          title: "Registro exitoso",
          text: "Usuario registrado correctamente",
          icon: "success",
          draggable: true,
          customClass: { popup: "font-poppins" },
        });
        navigate("/user/login");
      } else if (status === 200) {
        // Login exitoso
        localStorage.setItem("JWT", data.token);
        await Swal.fire({
          title: "Login correcto",
          text: "Bienvenido",
          icon: "success",
          draggable: true,
          customClass: { popup: "font-poppins" },
        });
        navigate("/user");
      } else {
        // Otros status - error o alerta
        await Swal.fire({
          title: "Error",
          text: "Datos inválidos",
          icon: "error",
          draggable: true,
          customClass: { popup: "font-poppins" },
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Error inesperado",
        text: error.message || "Ocurrió un error",
        icon: "error",
        draggable: true,
        customClass: { popup: "font-poppins" },
      });
    }
  };

  return (
    <section className="contenedor">
      <form onSubmit={handleFormulario}>
        <div className="campos">
          <h1 className="titulo">{handle ? "Login" : "Registro"}</h1>
        </div>

        <div className="campos">
          <label>{handle ? "Usuario o correo" : "Usuario"}</label>
          <input type="text" name="name" required />
        </div>

        {!handle && (
          <div className="campos">
            <label>Correo</label>
            <input type="email" name="gmail" required />
          </div>
        )}

        <div className="campos">
          <label>Contraseña</label>
          <input type="password" name="password" required />
        </div>

        <div className="campos btn-campos">
          <button className="btn-handle" type="submit">
            {handle ? "Login" : "Registrar"}
          </button>

          <div className="campos">
            {handle ? (
              <Link className="enlace" to="/user/register">
                ¿No tienes cuenta?
              </Link>
            ) : (
              <Link className="enlace" to="/user/login">
                ¿Ya tienes cuenta?
              </Link>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

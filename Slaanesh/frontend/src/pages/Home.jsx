import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Home.css";

export const Home = () => {
  return (
    <section className="Home">
      <div className="home-card">
        <h1>Bienvenido</h1>
        <p>Accede o regístrate para continuar.</p>
        <nav className="home-links">
          <Link to="/user/login" className="home-btn">Iniciar Sesión</Link>
          <Link to="/user/register" className="home-btn">Registrarse</Link>
          <Link to="/user" className="home-btn">Ruta Protegida</Link>
        </nav>
      </div>
    </section>
  );
};

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Componente
import { ProtectedRoute } from "./components/ProtectedRoute";

// Vistas
import { Home } from "./pages/Home";
import { Error404 } from "./pages/404";
import { User } from "./pages/User";

// Vistas de autenticacion
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

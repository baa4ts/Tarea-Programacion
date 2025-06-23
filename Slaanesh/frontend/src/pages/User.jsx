import React, { useEffect, useState } from "react";

export const User = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("JWT");
      if (!token) {
        setError("No token encontrado");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.mensaje || "Error al obtener el usuario");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Usuario</h2>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
};

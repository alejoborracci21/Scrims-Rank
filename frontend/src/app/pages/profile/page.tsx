"use client";

import Navbar from "@/app/components/navbar";
import background from "@/../public/profile.jpg";
import { useEffect, useState } from "react";

// Definimos la estructura del usuario, incluyendo stats como un objeto JSON
interface User {
  id: string;
  name: string;
  nickname: string;
  email: string;
  stats: Record<string, any>;
}

export default function Homepage() {
  // Estado para guardar los datos del usuario
  const [user, setUser] = useState<User | null>(null);
  // Estado para manejar errores
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los datos del usuario
  const getStats = async (): Promise<void> => {
    try {
      const id = localStorage.getItem("user");

      if (!id) {
        console.error("No se encontró un usuario en el localStorage");
        setError("No se encontró un usuario en el localStorage");
        return;
      }

      const response = await fetch(`https://scrims-rank.onrender.com/users/${id}`);

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }

      const userData: User = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      setError("Hubo un problema al cargar los datos del usuario.");
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center h-[150vh] w-[100%]"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col bg-black w-[60%] h-[70%] p-4 shadow-lg rounded-lg">
          {error ? (
            <h1 className="text-red-500">{error}</h1>
          ) : user ? (
            <>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <h2 className="text-xl">{user.nickname}</h2>
              <p>Otros datos: {JSON.stringify(user.stats)}</p>
            </>
          ) : (
            <h1>Cargando datos del usuario...</h1>
          )}
        </div>
      </div>
    </>
  );
}

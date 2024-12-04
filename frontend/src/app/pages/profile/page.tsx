"use client";

import Navbar from "@/app/components/navbar";
import background from "@/../public/profile.jpg";
import { useEffect, useState } from "react";
import Image from "next/image";

// Definimos la estructura del usuario, incluyendo stats como un objeto JSON
interface User {
  id: string;
  name: string;
  nickname: string;
  email: string;
  scrims: number;
  duels: number;
  points: number;
  image: string;
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
        console.error("No se encontró un usuario");
        setError("No se encontró un usuario");
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
        className="flex flex-col items-center justify-center h-[100vh] w-[100%]"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center justify-center bg-zinc-800 bg-opacity-80 w-[30%] h-[60%] p-4 shadow-lg rounded-lg">
          {error ? (
            <h1 className="text-red-500">{error}</h1>
          ) : user ? (
            <div className="flex flex-col items-center justify-center bg-transparent">
                <img
                src={user.image}
                alt="Profile image"
                width="100"
                height="100"
                loading="lazy"
                className="mb-4"
              />
            
              <h1 className="text-2xl font-bold mb-10">{user.nickname}</h1>
              <p className="text-xl">Duels won: {user.duels}</p>
              <p className="text-xl">Scrims won: {user.scrims}</p>
              <p className="text-xl">Points: {user.points}</p>
              <p className="text-red-600 mt-[20%]">Pase lo que pase sos malisimo, recorda eso.</p>
            </div>
          ) : (
            <h1 className="items-center justify-center">Cargando datos del usuario...</h1>
          )}
        </div>
      </div>
    </>
  );
}

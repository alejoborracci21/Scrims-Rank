"use client";

import Navbar from "@/app/components/navbar";
import { useEffect, useState } from "react";
import background from "@/../public/Lolbg.jpg";

// Interfaz para los datos de usuario
interface User {
  id: number;
  name: string;
  nickname: string;
  points: number;
}

// Componente principal
export default function Homepage() {
  const [users, setUsers] = useState<User[]>([]); // Estado para almacenar usuarios
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para errores

  // Función para obtener usuarios
  const fetchUsers = async () => {
    try {
      const response = await fetch("https://scrims-rank.onrender.com/users");

      if (!response.ok) {
        throw new Error(
          `Error al obtener usuarios: ${response.status} ${response.statusText}`
        );
      }

      const data: User[] = await response.json(); // Tipado de la respuesta
      // Ordenar usuarios por puntos de mayor a menor
      const sortedUsers = data.sort((a, b) => b.points - a.points);
      setUsers(sortedUsers);
    } catch (error: unknown) {
      if(error instanceof Error) setError(error.message || "Error desconocido.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col h-[150vh] w-[100%]"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col text-black bg-white bg-opacity-90 w-[80%] mx-auto mt-14 p-5 rounded shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Top ranking
          </h1>
          {loading ? (
            <p className="text-center">Cargando...</p>
          ) : error ? (
            <p className="text-red-500 text-center">Error: {error}</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-300 text text-black">
              <thead>
                <tr className="bg-gray-200 ">
                  <th className="border border-gray-300 px-4 py-2">Position</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Nickname </th>
                  <th className="border border-gray-300 px-4 py-2">Points</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.nickname}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

'use client'


import Navbar from "@/app/components/navbar";
import { useEffect, useState } from "react";

type Game = {
    id: number;
    team1: string[];
    team2: string[];
    game_date: string;
    game_type: string;
    winner: "team1" | "team2";
};

export default function History() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch de partidas al cargar la página
    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await fetch("https://scrims-rank.onrender.com/games");
                const data: Game[] = await response.json();
                console.log(data)
                setGames(data);
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGames();
    }, []);

    // Función para formatear la fecha
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { 
            year: "numeric", 
            month: "long", 
            day: "numeric", 
            hour: "2-digit", 
            minute: "2-digit" 
        };
        return new Date(dateString).toLocaleDateString("es-AR", options);
    };

    // Renderizado
    return (
      <div className="flex flex-col">
        <Navbar></Navbar>

        <div className="mt-[10%]">
          <h1>Historial de Partidas</h1>
          {loading ? (
            <p>Cargando partidas...</p>
          ) : games.length === 0 ? (
            <p>No hay partidas registradas.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                    Fecha
                  </th>
                  <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                    Tipo de Partida
                  </th>
                  <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                    Equipo 1
                  </th>
                  <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                    Equipo 2
                  </th>
                  <th style={{ border: "1px solid #ccc", padding: "10px" }}>
                    Ganador
                  </th>
                </tr>
              </thead>
              <tbody>
                {games.map((game) => (
                  <tr key={game.id}>
                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                      {formatDate(game.game_date)}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                      {game.game_type}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                      {game.team1.join(", ")}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                      {game.team2.join(", ")}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                      {game.winner
                        ? game.winner === "team1"
                          ? "Equipo 1"
                          : "Equipo 2"
                        : "Sin definir"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
}

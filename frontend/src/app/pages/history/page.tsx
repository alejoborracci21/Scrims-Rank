'use client';

import Navbar from "@/app/components/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Game = {
    id: number;
    team1: string[];
    team2: string[];
    game_date: string;
    game_type: string;
    winner: "team1" | "team2" | null;
};

export default function History() {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // Validar si el usuario está logueado
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            router.push("/");
        } else {
            setIsLoading(false); // Se sigue renderizando después del cambio
        }
    }, [router]);

    // Fetch de partidas al cargar la página
    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await fetch("https://scrims-rank.onrender.com/games");
                const data: Game[] = await response.json();
                setGames(data);
            } catch (error) {
                console.error("Error fetching games:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGames();
    }, []);

    // Formatear la fecha
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("es-AR", options);
    };

    // Si está cargando el estado del usuario, mostramos un mensaje de "Loading..."
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Renderizar la tabla o el mensaje
    return (
        <div className="flex flex-col">
            <Navbar />
            <div className="mt-[10%]">
                <h1 className="flex items-center justify-center">Historial de Partidas</h1>
                {loading ? (
                    <p className="flex items-center justify-center">Cargando partidas...</p>
                ) : games.length === 0 ? (
                    <p className="flex items-center justify-center">No hay partidas registradas.</p>
                ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Fecha</th>
                                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Tipo de Partida</th>
                                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Equipo 1</th>
                                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Equipo 2</th>
                                <th style={{ border: "1px solid #ccc", padding: "10px" }}>Ganador</th>
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

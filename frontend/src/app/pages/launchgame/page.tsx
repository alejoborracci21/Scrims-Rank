'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import Navbar from "@/app/components/navbar";


// Función auxiliar para actualizar los resultados del partido
const updatePlayerData = async (player: string, points: number) => {
  try {
    const userResponse = await fetch(`https://scrims-rank.onrender.com/users/nickname/${player}`);
    if (!userResponse.ok) throw new Error(`User not found: ${player}`);

    const user = await userResponse.json();
    const updatedUser = {
      ...user,
      scrims: user.scrims + 1,
      points: user.points + points,
    };

    const updateResponse = await fetch(`https://scrims-rank.onrender.com/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    if (!updateResponse.ok) throw new Error(`Failed to update user: ${player}`);

  } catch (error:any) {
    console.error(`Error updating player data: ${error.message}`);
  }
};

export default function LaunchGame() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [team1, setTeam1] = useState<string[]>([]);
  const [team2, setTeam2] = useState<string[]>([]);
  const [matchType, setMatchType] = useState("");
  const [winner, setWinner] = useState<"team1" | "team2" | "">("");

  //! Validando que el usuario este logueado

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
  
      if (!user) {
        router.push("/");
        return; // Salir para evitar seguir con la ejecución.
      }
  
      // Cargar datos del localStorage
      const storedTeam1 = localStorage.getItem("team1");
      const storedTeam2 = localStorage.getItem("team2");
      const storedMatchType = localStorage.getItem("matchType");
  
      if (storedTeam1) setTeam1(JSON.parse(storedTeam1));
      if (storedTeam2) setTeam2(JSON.parse(storedTeam2));
      if (storedMatchType) setMatchType(storedMatchType);
  
      setIsLoading(false); // Todo está listo, cambiamos el estado de carga.
    }
  }, [router]);

  //!-----------------------------------------------

  const handleMatchResult = async () => {
    console.log(winner)
    if (!winner) {
      alert("Please select a winner.");
      return
    }
    localStorage.removeItem("team1")
    localStorage.removeItem("team2")
    localStorage.removeItem("matchType")
    localStorage.removeItem("winner")




    const teamMembers = winner === "team1" ? team1 : team2;
    const points = matchType === "BO1" ? 1 : matchType === "BO3" ? 3 : 5;

    try {
      // Actualizar datos de los jugadores
      await Promise.all(teamMembers.map((player) => updatePlayerData(player, points)));

      await fetch('https://scrims-rank.onrender.com/games', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team1: team1,
          team2: team2,
          game_type: matchType,
          game_date: new Date().toISOString(), // Fecha en formato ISO
          winner: winner
        })
      });
      // Limpiar datos de localStorage
      localStorage.removeItem("team1");
      localStorage.removeItem("team2");

      // Redirigir a la página principal
      router.push("/pages/homepage");
    } catch (error) {
      console.error("Error updating match results:", error);
      alert("There was an error updating the match results.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[100vh] p-10 bg-slate-700 text-white">
        <h1 className="text-3xl font-bold mb-5">Match Results</h1>

        <div className="flex space-x-10 mb-5">
          <div>
            <h2 className="text-xl font-semibold">Team 1</h2>
            <ul>
              {team1.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Team 2</h2>
            <ul>
              {team2.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-5">
          <label className="mr-2">Select the winning team:</label>
          <select
            value={winner}
            onChange={(e) => setWinner(e.target.value as "team1" | "team2")}
            className="border p-2 rounded bg-black"
          >
            <option value="">Select Winner</option>
            <option value="team1">Team 1</option>
            <option value="team2">Team 2</option>
          </select>
        </div>

        <Button
          variant="contained"
          className="bg-red-600"
          onClick={handleMatchResult}
        >
          End Match
        </Button>
      </div>
    </>
  );
}

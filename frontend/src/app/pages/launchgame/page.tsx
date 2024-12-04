'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

// Función para realizar la actualización en la base de datos
const updateMatchResults = async (winningTeam: "team1" | "team2", teamMembers: string[]) => {
  try {
    // Recorremos los jugadores del equipo ganador
    for (const player of teamMembers) {
      // Buscar cada jugador por su nickname
      const response = await fetch(`https://scrims-rank.onrender.com/users?nickname=${player}`);
      if (!response.ok) {
        throw new Error(`Failed to find player: ${player}`);
      }
      const playerData = await response.json();
      
      // Asumimos que la respuesta nos devuelve un array de jugadores, con al menos un jugador
      const playerId = playerData[0]?.id;
      
      if (playerId) {
        // Actualizamos los datos del jugador en la base de datos
        const updateResponse = await fetch(`https://scrims-rank.onrender.com/users/${playerId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ scrimsWon: 1 }), // Aumentar los scrims ganados
        });
        if (!updateResponse.ok) {
          throw new Error(`Failed to update player ${player}`);
        }
      }
    }
    
    alert("Match results updated successfully");
  } catch (error) {
    alert("Error updating match results");
    console.error(error);
  }
};

export default function LaunchGame() {
  const [team1, setTeam1] = useState<string[]>([]);
  const [team2, setTeam2] = useState<string[]>([]);
  const [matchType, setMatchType] = useState("");
  const [winner, setWinner] = useState<"team1" | "team2" | "">("");
  
  useEffect(() => {
    const storedTeam1 = localStorage.getItem("team1");
    const storedTeam2 = localStorage.getItem("team2");
    const storedMatchType = localStorage.getItem("matchType");

    if (storedTeam1) setTeam1(JSON.parse(storedTeam1));
    if (storedTeam2) setTeam2(JSON.parse(storedTeam2));
    if (storedMatchType) setMatchType(storedMatchType);
  }, []);

  // Función que se ejecuta al elegir el equipo ganador
  const handleMatchResult = () => {
    if (winner) {
      const teamMembers = winner === "team1" ? team1 : team2;
      updateMatchResults(winner, teamMembers);
    } else {
      alert("Please select a winner.");
    }
  };

  return (
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
  );
}

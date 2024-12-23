'use client';

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/app/components/navbar";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const getAllPlayers = async () => {
  try {
    const response = await fetch('https://scrims-rank.onrender.com/users');
    if (!response.ok) {
      throw new Error("Failed to fetch players");
    }
    const players = await response.json();
    return players.map((player: { nickname: string }) => player.nickname);
  } catch (error) {
    console.error(`Failed to fetch players: ${error}`);
    return [];
  }
};

export default function Homepage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [team1, setTeam1] = useState(new Array(5).fill("")); // Empty array for team1
  const [team2, setTeam2] = useState(new Array(5).fill("")); // Empty array for team2
  const [matchType, setMatchType] = useState("BO1"); // Default match type
  const [availablePlayers, setAvailablePlayers] = useState<string[]>([]); // Estado para los jugadores disponibles

  // Validar usuario logueado
  useEffect(() => {
    const validateUser = () => {
      const user = localStorage.getItem("user");
      if (!user) {
        router.replace("/"); // Reemplazar en lugar de empujar para evitar conflictos de navegación
      } else {
        setIsLoading(false);
      }
    };

    // Validación solo en el cliente
    if (typeof window !== "undefined") {
      validateUser();
    }
  }, [router]);

  // Obtener jugadores disponibles
  useEffect(() => {
    const fetchPlayers = async () => {
      const players = await getAllPlayers();
      setAvailablePlayers(players);
    };

    fetchPlayers();
  }, []);

  const isPlayerInAnyTeam = useCallback(
    (player: string) => {
      return [...team1, ...team2].includes(player);
    },
    [team1, team2]
  );

  const handlePlayerChange = useCallback(
    (team: 1 | 2, index: number, value: string) => {
      if (value && isPlayerInAnyTeam(value)) {
        alert("This player is already selected in another team.");
        return;
      }

      if (team === 1) {
        setTeam1((prev) => {
          const newTeam = [...prev];
          newTeam[index] = value;
          return newTeam;
        });
      } else {
        setTeam2((prev) => {
          const newTeam = [...prev];
          newTeam[index] = value;
          return newTeam;
        });
      }
    },
    [isPlayerInAnyTeam]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col bg-slate-700 w-[100%] h-[100vh]">
      <Navbar />
      <div className="flex-grow p-10">
        <div className="p-10">
          <label className="mr-2">Select Match Type:</label>
          <select
            value={matchType}
            onChange={(e) => setMatchType(e.target.value)}
            className="border p-2 rounded bg-black"
          >
            <option value="BO1">Best of 1 (BO1)</option>
            <option value="BO3">Best of 3 (BO3)</option>
            <option value="BO5">Best of 5 (BO5)</option>
          </select>
        </div>

        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-black">
              <th className="border px-4 py-2">Position</th>
              <th className="border px-4 py-2">Team 1</th>
              <th className="border px-4 py-2">Team 2</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  <select
                    value={team1[index]}
                    onChange={(e) =>
                      handlePlayerChange(1, index, e.target.value)
                    }
                    className="border p-2 rounded bg-black"
                  >
                    <option value="">Select Player</option>
                    {availablePlayers.map((player, i) => (
                      <option key={i} value={player}>
                        {player}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <select
                    value={team2[index]}
                    onChange={(e) =>
                      handlePlayerChange(2, index, e.target.value)
                    }
                    className="border p-2 rounded bg-black"
                  >
                    <option value="">Select Player</option>
                    {availablePlayers.map((player, i) => (
                      <option key={i} value={player}>
                        {player}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        onClick={() => {
          const isTeam1Valid = team1.every((player) => player !== "");
          const isTeam2Valid = team2.every((player) => player !== "");

          if (!isTeam1Valid || !isTeam2Valid) {
            return alert("Both teams must have 5 players each.");
          }

          localStorage.setItem("team1", JSON.stringify(team1));
          localStorage.setItem("team2", JSON.stringify(team2));
          localStorage.setItem("matchType", matchType);

          router.push("/pages/launchgame"); // Usa router para navegar de manera controlada
        }}
        variant="contained"
        className="bg-red-600 mt-auto mb-5 mx-auto"
      >
        Launch game
      </Button>
    </div>
  );
}

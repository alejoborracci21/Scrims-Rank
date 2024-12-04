'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import Navbar from "@/app/components/navbar";

const updateMatchResults = async (winningTeam: "team1" | "team2", teamMembers: string[]) => {
  try {
    for (const player of teamMembers) {
      const response = await fetch(`https://scrims-rank.onrender.com/users?nickname=${player}`);
      if (!response.ok) {
        alert(`Failed to find player`)
      }
      const playerData = await response.json();
      
      const playerId = playerData[0]?.id;
      
      if (playerId) {
        const updateResponse = await fetch(`https://scrims-rank.onrender.com/users/${playerId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ scrimsWon: 1 }),
        });
      }
    }
    
    alert("Match results updated successfully");
  } catch (error) {
    alert("Error updating match results");
    console.error(error);
  }
};

export default function LaunchGame() {

    //! Validando que el usuario este logueado
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (!user) {
        router.push("/");
      } else {
        setIsLoading(false); 
      }
    }, [router]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }

    //!-----------------------------------------------


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

  const handleMatchResult = async () => {
    if (winner) {
      const teamMembers = winner === "team1" ? team1 : team2;
      try {
        const points = matchType === "BO1" ? 1 : matchType === "BO3" ? 3 : 5;
  
        // Realizar actualizaciones de todos los jugadores
        await Promise.all(
          teamMembers.map(async (player) => {
            const userResponse = await fetch(`https://scrims-rank.onrender.com/users/nickname/${player}`);
            if (!userResponse.ok) {
              console.error(`Error finding user with nickname: ${player}`);
              return;
            }
            const user = await userResponse.json();
  
            const updatedUser = {
              ...user,
              scrims: user.scrims + 1,
              points: user.points + points,
            };
  
            const updateResponse = await fetch(`https://scrims-rank.onrender.com/users/${user.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedUser),
            });
  
            if (!updateResponse.ok) {
              console.error(`Error updating user: ${player}`);
            }
          })
        );
  
        // Limpiar datos específicos de localStorage
        localStorage.removeItem("team1");
        localStorage.removeItem("team2");
  
        // Redirigir a la página principal
        window.location.href = "/pages/homepage";
      } catch (error) {
        console.error("Error updating match results:", error);
        alert("There was an error updating the match results.");
      }
    } else {
      alert("Please select a winner.");
    }
  };

  return (
    <>
    <Navbar/>
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

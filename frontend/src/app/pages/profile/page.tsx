"use client";

import Navbar from "@/app/components/navbar";
import background from "@/../public/profile.jpg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); 
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null); 

  

  useEffect(() => {
    const storedUserId = localStorage.getItem("user");
    if (!storedUserId) {
      router.push("/"); 
    } else {
      setIsLoading(false); 
    }
  }, [router]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUserId = localStorage.getItem("user");
        if (!storedUserId) {
          setError("No se encontró el usuario.");
          return;
        }

        const response = await fetch(
          `https://scrims-rank.onrender.com/users/${storedUserId}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const userData: User = await response.json();
        setUser(userData);
      } catch (err) {
        setError(`Hubo un problema al cargar los datos del usuario: ${err}`);
      }
    };

    if (!isLoading) {
      fetchUser();
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

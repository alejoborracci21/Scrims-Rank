'use client'

import Navbar from "@/app/components/navbar";
import background from "@/../public/homepage.webp";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Homepage() {
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
 

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col h-[100vh] w-[100%]"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-center items-center mt-[8%] bg">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center bg-opacity-90 w-[400px] h-[300px] rounded shadow-lg bg-slate-800">
              <h1 className="font-bold text-3xl text-center mb-6">Scrim 5vs5</h1>
              <p className="p-5">
                A 5v5 match where the teams are chosen by two participants who decide to compete against each other. The winners of this match will earn 1 victory scrim and points. The winner is determined by the "BO1", "BO3" or "BO5".
              </p>
              <Button className="w-[80%]" href="/pages/creategame" variant="contained">
                Create game
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

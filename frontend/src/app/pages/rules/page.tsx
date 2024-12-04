"use client";

import Navbar from "@/app/components/navbar";
import background from "@/../public/rules.jpg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Validar usuario logueado
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/"); // Redirigir si no hay usuario
    } else {
      setIsLoggedIn(true); // Usuario logueado
    }
    setIsLoading(false); // Fin de la carga inicial
  }, [router]);

  // Render mientras valida login
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render principal
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
        {isLoggedIn && (
          <div className="text-white text-center mt-10">
          </div>
        )}
      </div>
    </>
  );
}

'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation'; // Usar el nuevo router del App Router
import background from "@/../public/navbar.webp"; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-center w-[100vw] h-[7vh] fixed text-white shadow-xl shadow-black" style={{
      backgroundImage: `url(${background.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <Stack direction="row" spacing={4}>
        <Button
          sx={{
            color: 'white',
            border: 'none', // Elimina cualquier borde visible
            padding: '6px 16px', // Ajuste de padding para no dejar borde visible
          }}
          className="bg-transparent transition duration-300 ease-in-out hover:shadow-lg hover:shadow-white hover:bg-white hover:text-black"
          onClick={() => { router.push("/pages/homepage") }}
        >
          Home
        </Button>
        <Button
          sx={{
            color: 'white',
            border: 'none',
            padding: '6px 16px',
          }}
          className="bg-transparent transition duration-300 ease-in-out hover:shadow-lg hover:shadow-white hover:bg-white hover:text-black"
          onClick={() => { router.push("/pages/profile") }}
        >
          Profile
        </Button>
        <Button
          sx={{
            color: 'white',
            border: 'none',
            padding: '6px 16px',
          }}
          className="bg-transparent transition duration-300 ease-in-out hover:shadow-lg hover:shadow-white hover:bg-white hover:text-black"
          onClick={() => { router.push("/pages/ranking") }}
        >
          Ranking
        </Button>
        <Button
          sx={{
            color: 'white',
            border: 'none',
            padding: '6px 16px',
          }}
          className="bg-transparent transition duration-300 ease-in-out hover:shadow-lg hover:shadow-white hover:bg-white hover:text-black"
          onClick={() => { router.push("/pages/rules") }}
        >
          Rules
        </Button>
      </Stack>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#000000]" />
    </div>
  );
}

export default Navbar;

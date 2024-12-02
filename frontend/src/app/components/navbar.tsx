'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation'; // Usar el nuevo router del App Router

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-center bg-[#f12727] w-[100vw] h-[7vh] fixed text-white shadow-xl shadow-black">
      <Stack direction="row" spacing={4}>
        <Button sx={{color:'black'}} onClick={()=> {router.push("/pages/homepage")}}>Home</Button>
        <Button sx={{color:'black'}} onClick={()=> {router.push("/pages/profile")}}>Profile</Button>
        <Button sx={{color:'black'}} onClick={()=> {router.push("/pages/ranking")}}>Ranking</Button>
        <Button sx={{color:'black'}} onClick={()=> {router.push("/pages/rules")}}>Rules</Button>
      </Stack>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#000000]" />
    </div>
  );
}

export default Navbar;

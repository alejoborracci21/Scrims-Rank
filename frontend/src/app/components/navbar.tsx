'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Navbar = () => {
    return (
      <div className="flex flex-row justify-center bg-zinc-600 w-[100vw] h-[10vh] fixed text-white">
        <Stack direction="row" spacing={2}>
          <Button >Profile</Button>
          <Button>Ranking</Button>
          <Button>Rules</Button>
        </Stack>
      </div>
    );
}

export default Navbar
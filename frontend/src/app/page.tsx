'use client'

import Login from "./components/login";
import Head from "next/head";  // Importa el componente Head

export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Bienvenido a nuestra página de inicio." />
      </Head>
      <Login />
    </>
  );
}

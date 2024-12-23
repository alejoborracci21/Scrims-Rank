'use client';

import { useState, useEffect } from 'react';
import background from "@/../public/login.webp"; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        router.push("/pages/homepage");
      }
    }
  }, []);



  //Alternar entre login y registro
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  //Credenciales del usuario
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nickname, setNickName] = useState<string>('');
  const [error, setError] = useState<string>('');


  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await fetch('https://scrims-rank.onrender.com/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.id);

      router.push('/pages/homepage');
    } catch (err: unknown) { 
      if (err instanceof Error) {
        setError(err.message || 'Error al iniciar sesión');
      } else {
        setError('Error desconocido');
      }
    }
  };

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { email, password, name, nickname };

    try {
      const response = await fetch('https://scrims-rank.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }

      alert('Usuario registrado exitosamente');
      setIsRegistering(false); 
    } catch (err: unknown) {
      if(err instanceof Error){
        setError(err.message || 'Error al registrar usuario');
      }else{
        return ("Error desconocido")
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{
      backgroundImage: `url(${background.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <form
        onSubmit={isRegistering ? handleSubmitRegister : handleSubmitLogin}
        className="w-full max-w-md bg-white p-8 rounded shadow-2xl shadow-black"
      >
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
        </h2>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required

            className="w-full px-4 py-2 border text-black border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border text-black border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isRegistering && (
          <>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="summonerName"
                className="block text-gray-700 font-medium mb-2"
              >
                Nick de Invocador
              </label>
              <input
                type="text"
                id="summonerName"
                value={nickname}
                onChange={(e) => setNickName(e.target.value)}
                required
                className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full bg-red-700 mt-2 text-white py-2 rounded hover:bg-red-800 focus:outline-none"
        >
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Login;

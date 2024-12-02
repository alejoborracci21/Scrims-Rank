'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login y registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [summonerName, setSummonerName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

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

      router.push('/pages/homepage');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = { email, password, name, summonerName };

    try {
      const response = await fetch('https://scrims-rank.onrender.com/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }

      const data = await response.json();
      alert('Usuario registrado exitosamente');
      setIsRegistering(false); // Regresar al formulario de login
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-500">
      <form
        onSubmit={isRegistering ? handleSubmitRegister : handleSubmitLogin}
        className="w-full max-w-md bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
        </h2>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}

        {/* Inputs comunes */}
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
            className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                value={summonerName}
                onChange={(e) => setSummonerName(e.target.value)}
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
          {isRegistering ? 'Registrar' : 'Entrar'}
        </button>

        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full bg-red-700 mt-2 text-white py-2 rounded hover:bg-red-800 focus:outline-none"
        >
          {isRegistering ? 'Volver a Iniciar Sesión' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default Login;

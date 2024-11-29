'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Usar el nuevo router del App Router

const Login = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = {
      email: email,
      password: password
    };
    
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST', // Método HTTP
        headers: {
          'Content-Type': 'application/json', // Especifica que envías JSON
        },
        body: JSON.stringify(user), // Convierte el objeto user a JSON
      });
  
      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }
  
      // Guarda el token en localStorage o cookies
      const data = await response.json();
      localStorage.setItem('token', data.token);
  
      router.push('/pages/homepage'); // Redirige después del login
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Iniciar Sesión
        </h2>
        {error && (
          <p className="mb-4 text-center text-red-500">{error}</p>
        )}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;

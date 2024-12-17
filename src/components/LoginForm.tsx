import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import userStore from '../utils/UserStore';
import TreeLoader from './TreeLoader/TreeLoader';

const LoginForm: React.FC = () => {
  const apiUrl = import.meta.env.VITE_SANTA_BACK_URL;
  const urlParams = new URLSearchParams(window.location.search);
  const linkEmail = urlParams.get('email');
  const linkSecret = urlParams.get('secret');
  const [email, setEmail] = useState(linkEmail || '');
  const [password, setPassword] = useState(linkSecret || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(`${apiUrl}/api/users/login`, {
        email,
        password,
      });
      localStorage.setItem("santaToken", response.data.token);
      userStore.setState((state) => ({
        ...state,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        wishes: response.data.user.wishes,
        role: response.data.user.role,
      }));
      setIsLoading(false);
      setError(''); // Reset the error
      navigate("/secret-santa-front/");
    } catch {
      setError("Erreur de connexion. Vérifie ton email et mot de passe.");
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {isLoading && (
        <TreeLoader />
      )}
      {!isLoading && (
      <motion.form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Se connecter</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Se connecter
          </button>
        </div>
        </motion.form>
      )}
    </motion.div>
  );
};

export default LoginForm;
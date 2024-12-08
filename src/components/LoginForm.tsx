import React, { useState } from "react";
import axios from "axios";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Stocker le JWT
      setError(""); // Réinitialiser l'erreur
      alert("Connexion réussie");
    } catch {
      setError("Erreur de connexion. Vérifie ton email et mot de passe.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginForm;

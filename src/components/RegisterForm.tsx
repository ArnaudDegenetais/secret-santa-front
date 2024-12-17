import React, { useState } from "react";
import axios from "axios";

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    const apiUrl = import.meta.env.VITE_SANTA_BACK_URL;

    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/users/register`, {
        firstName,
        lastName,
        email,
        password,
        groupIds: ["1"],
      });
      alert("Inscription réussie");
    } catch {
      setError("Erreur lors de l'inscription. Essaye encore.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="string"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="string"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
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
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;

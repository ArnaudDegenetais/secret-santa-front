import React, { useState } from "react";
import axios from "axios";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        email,
        password,
        groupIds: ["1"],
      });
      console.log("HANDLE SUBMIT : ",response.data);
      alert("Inscription réussie");
    } catch {
      setError("Erreur lors de l'inscription. Essaye encore.");
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
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default RegisterForm;

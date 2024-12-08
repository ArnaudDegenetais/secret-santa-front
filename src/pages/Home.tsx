import React, { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [groupMembers, setGroupMembers] = useState<string[]>([]);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/api/users/group/1", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setGroupMembers(response.data);
        } catch (err) {
          console.error("Erreur lors de la récupération des membres du groupe.", err);
        }
      }
    };

    fetchGroupMembers();
  }, []);

  return (
    <div>
      <h2>Bienvenue dans votre groupe Secret Santa !</h2>
      <h3>Membres du groupe</h3>
      <ul>
        {groupMembers.map((email) => (
          <li key={email}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

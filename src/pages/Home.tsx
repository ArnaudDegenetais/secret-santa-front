import React, { useEffect, useState } from "react";
import axios from "axios";

const Home: React.FC = () => {
  const [groupMembers, setGroupMembers] = useState<string[]>([]);
  // using env variable
  console.log(import.meta.env.VITE_SANTA_BACK_URL);

  const apiUrl = import.meta.env.VITE_SANTA_BACK_URL;

  useEffect(() => {
    const fetchGroupMembers = async () => {
      console.log("fetchGroupMembers");
      const token = localStorage.getItem("token");
      console.log("token : ", token);
      if (token) {
        try {
          // const response = await axios.get(apiUrl + "api/users/group/1", {
          const response = await axios.get(apiUrl + "api/users/", {
            // headers: { Authorization: `Bearer ${token}` },
          });
          console.log("after request : ", response);
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
      <h3>Lutins malins du groupe 1 </h3>
      <ul>
        {groupMembers.map((email) => (
          <li key={email}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

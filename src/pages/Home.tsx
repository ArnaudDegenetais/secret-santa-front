import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TreeLoader from "../components/TreeLoader";
import UsersList from "../components/UsersList";

type members = {
  userId: number;
  firstName?: string;
  lasttName?: string;
  email: string;
  groupIds: number;
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const token = localStorage.getItem("santaToken");
    if (token) {
      const decodedToken = JSON.parse(token);
      console.log("decodedToken : ", decodedToken);
      if (decodedToken.userId === "6754fa3085a993e1b0474740") {
        navigate("/secret-santa-front/register");
      } else {
        alert("Token ID does not match.");
      }
    } else {
      alert("No token found.");
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  const [groupMembers, setGroupMembers] = useState<members[]>([]);
  // using env variable
  console.log(import.meta.env.VITE_SANTA_BACK_URL);

  const apiUrl = import.meta.env.VITE_SANTA_BACK_URL;

  useEffect(() => {
    const fetchGroupMembers = async () => {
      console.log("fetchGroupMembers");
      // const token = localStorage.getItem("santaToken");
      // console.log("token : ", token);
      // if (token) {
      try {
        setIsLoading(true);
        const response = await axios.get(apiUrl + "/api/users/", {
            // headers: { Authorization: `Bearer ${token}` },
          });
          console.log("after request : ", response);
        setGroupMembers(response.data);
        setIsLoading(false);
        } catch (err) {
          console.error("Erreur lors de la récupération des membres du groupe.", err);
        }
      // }
    };

    fetchGroupMembers();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 20, margin: 20, width: 800 }}>
      {isLoading && <TreeLoader />}
      {!isLoading &&
        <>
        <UsersList membersList={groupMembers} isLoading={isLoading} />
        <button onClick={handleNavigate}>Go to Register</button>
        </>
      }
    </div>
  );
};

export default Home;

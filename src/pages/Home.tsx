import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import TreeLoader from "../components/TreeLoader";
import UsersList from "../components/UsersTable/UsersList";

type members = {
  userId: number;
  firstName?: string;
  lastName?: string;
  email: string;
  groupIds: number;
  constraints: string[];
  receiverId: string;
};

type tokenPayload = JwtPayload & {
  role: string;
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const token = localStorage.getItem("santaToken");
    console.log("token : ", token);
    if (token) {
      const decoded: tokenPayload = jwtDecode(token);
      console.log("decoded : ", decoded);
      if (decoded.role === "admin") {
        navigate("/secret-santa-front/register");
      } else {
        alert("Unauthorized access. Admin only.");
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

  const chooseReceiver = async () => {
    await axios.post(apiUrl + "/api/users/secret-santa/start");
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 20, margin: 20, width: '100%' }}>
      {isLoading && <TreeLoader />}
      {!isLoading &&
        <>
        <UsersList membersList={groupMembers} isLoading={isLoading} />
        <button onClick={handleNavigate}>Go to Register</button>
        <button onClick={chooseReceiver}>Choose Receiver</button>
        </>
      }
    </div>
  );
};

export default Home;

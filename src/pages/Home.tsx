import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useStore } from "@tanstack/react-store";
import userStore from "../utils/UserStore";
import TreeLoader from "../components/TreeLoader/TreeLoader";
import Layout from '../components/Layout';
import UsersList from "../components/UsersTable/UsersList";
import UserHome from "./UserHome";

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
  receiverId: string;
  userId: string;
};

const Home: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSantaChoosing, setIsSantaChoosing] = useState(false);
  const [isSendingMail, setIsSendingMail] = useState(false);
  const navigate = useNavigate();
  const user = useStore(userStore, (state) => state);

  useEffect(() => {
    const token = localStorage.getItem("santaToken");
    if (!token) {
      navigate("/secret-santa-front/login");
    } else {
      const decoded: tokenPayload = jwtDecode(token);
      if (decoded.role === "admin") {
        setIsAdmin(true);
      }
      if (user.email === "") {
        axios.get(`${apiUrl}/api/users/user/${decoded.userId}`)
          .then((response) => {
            userStore.setState((state) => ({
              ...state,
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
              wishes: response.data.wishes,
              role: response.data.role,
            }));
          });
      }
    }
  }, [navigate, user.email]);

  const [isLoading, setIsLoading] = useState(true);
  const [groupMembers, setGroupMembers] = useState<members[]>([]);
  const apiUrl = import.meta.env.VITE_SANTA_BACK_URL;

  useEffect(() => {
    const fetchGroupMembers = async () => {
      // console.log("token : ", token);
      // if (token) {
      try {
        setIsLoading(true);
        const response = await axios.get(apiUrl + "/api/users/", {
            // headers: { Authorization: `Bearer ${token}` },
        });
        setGroupMembers(response.data);
        setIsLoading(false);
        } catch (err) {
          console.error("Erreur lors de la récupération des membres du groupe.", err);
        }
      // }
    };

    fetchGroupMembers();
  }, [apiUrl]);

  const chooseReceiver = async () => {
    setIsSantaChoosing(true);
    await axios.post(apiUrl + "/api/users/secret-santa/start");
    setIsSantaChoosing(false);
  }

  const sendEmails = async () => {
    setIsSendingMail(true);
    await axios.post(apiUrl + "/api/users/secret-santa/send-emails");
    setIsSendingMail(false);
  }

  return (
    <Layout>
      {isLoading && <TreeLoader />}
      {!isLoading && isAdmin && (
        <>
          <UsersList membersList={groupMembers} isLoading={isLoading} />
          {isSantaChoosing && (
            <div className="flex items-center justify-center">
              <div className="spinner"></div>
            </div>
          )}
          {!isSantaChoosing && <button onClick={chooseReceiver}>Choose Receiver</button>}
          {isSendingMail && (
            <div className="flex items-center justify-center">
              <div className="spinner"></div>
            </div>
          )}
          {!isSendingMail && <button onClick={sendEmails}>Send Emails</button>}
        </>
      )}
      {!isLoading && !isAdmin && (
        <>
          <UserHome />
        </>
      )}
    </Layout>
  );
};

export default Home;

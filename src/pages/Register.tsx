import React, { useEffect } from "react";
import axios from "axios";
import RegisterForm from "../components/RegisterForm";
import UsersList from "../components/UsersList";
import './Register.css';

const Register: React.FC = () => {
  const [groupMembers, setGroupMembers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const apiUrl = import.meta.env.VITE_SANTA_BACK_URL;
  useEffect(() => {
    const fetchGroupMembers = async () => {
      console.log("fetchGroupMembers");
      const token = localStorage.getItem("santaToken");
      console.log("token : ", token);
      // if (token) {
      try {
        setIsLoading(true);
        // const response = await axios.get(apiUrl + "api/users/group/1", {
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
    <div className="register-container">
      <h2>Inscription</h2>
      <div className="register-grid">
        <div className="register-form">
          <RegisterForm />
        </div>
        <div className="users-list">
          <UsersList membersList={groupMembers} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Register;
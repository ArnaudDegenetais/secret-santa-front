import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TreeLoader from './TreeLoader/TreeLoader';
import { jwtDecode, JwtPayload } from 'jwt-decode';

type tokenPayload = JwtPayload & {
  role: string;
  receiverId: string;
};

type Receiver = {
  firstName: string;
  lastName: string;
};

const MyReceiver: React.FC = () => {
  const apiUrl = import.meta.env.VITE_SANTA_BACK_URL;
  const [showReceiver, setShowReceiver] = useState(false);
  const [receiver, setReceiver] = useState<Receiver>({ firstName: "", lastName: "" });
  const token = localStorage.getItem("santaToken");

  if (!token) {
    console.log("No token found");
    throw new Error("No token found");
  }

  const decoded = jwtDecode<tokenPayload>(token);
  const receiverId = decoded.receiverId;

  const retreiveReceiver = async () => {
    await axios.get(`${apiUrl}/api/users/user/${receiverId}`).then((response) => {
      setReceiver(response.data);
    });
  }

  useEffect(() => {
    retreiveReceiver();
    const timer = setTimeout(() => {
      setShowReceiver(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-between h-full p-4">
      {!showReceiver &&
        <div className="flex flex-col justify-between h-full p-4">
          <TreeLoader />
          <h2 className="text-center text-black mt-5 z-50">Je recherche ton enfant sage...</h2>
        </div>
      }
      {showReceiver && (
        <div>
          <h2 className="text-center text-black mt-5 z-50">Shut, tu es le lutin secret pour : </h2>
          <p className="text-center text-4xl text-black mt-5 z-50">{receiver.firstName} {receiver.lastName}</p>
          <p className="text-center text-black mt-5 z-50">Tu devrais prochainement avoir de ses nouvelles quand sa liste aura été envoyée au Père Noël.</p>
        </div>
      )}
    </div>
  );
};

export default MyReceiver;
import MyReceiver from "@/components/MyReceiver";
import Jodit from "@/components/WysiwygEditor/Jodit";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Snowflake from "@/components/Snowflake";

type tokenPayload = JwtPayload & {
  role: string;
  receiverId: string;
  userId: string;
};

const UserHome: React.FC = () => {
  const apiUrl = import.meta.env.VITE_SANTA_BACK_URL;
  const [wish, setWish] = useState("");
  const token = localStorage.getItem("santaToken");
  const joditMessage = "Rédige ta lettre au Père Noël ici !";

  if (!token) {
    console.log("No token found");
    throw new Error("No token found");
  }

  const decoded = jwtDecode<tokenPayload>(token);
  const userId = decoded.userId;
  const updateWhish = useCallback(async (newWhish: string) => {
    await axios.put(`${apiUrl}/api/users/user/${userId}`, { wishes: newWhish });
  }, [apiUrl, userId]);

  // calculate window size
  const [windowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    updateWhish(wish);
  }, [wish]);

  const snowflakes = Array.from({ length: 50 }).map(() => ({
    size: Math.random() * 10 + 5,
    left: Math.random() * windowSize.width,
    delay: Math.random() * 10,
  }));

  return (
    <div className="relative overflow-hidden h-screen">
      {
        snowflakes.map((snowflake, index) => (
          <Snowflake key={index} size={snowflake.size} left={snowflake.left} delay={snowflake.delay} />
        ))
      }
      < div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 " >
        <motion.div
          className="bg-red-200 p-4 rounded-lg shadow-md h-80 md:h-150"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MyReceiver />
        </motion.div>
        <motion.div
          className="bg-green-200 p-4 rounded-lg shadow-md h-max"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Jodit setWish={setWish} placeholder={joditMessage} />
        </motion.div>
      </div >
    </div>
  );
};

export default UserHome;
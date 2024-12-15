import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from "@tanstack/react-store";
import userStore from "../utils/UserStore";
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const user = useStore(userStore, (state) => state);
  const navigate = useNavigate();
  const [navHeight, setNavHeight] = React.useState('100vh');
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logged out");
    localStorage.removeItem('santaToken');
    navigate('/secret-santa-front/login');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  useEffect(() => {
    // Check the device type and set the height accordingly
    if (isMobile) {
      console.log("Mobile device detected");
      setNavHeight('50vh');
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: navHeight, width: '100%' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: 20, background: '#f5f5f5' }}>
        <div>
          {user.role === 'admin' &&
            <>
              <button onClick={() => handleNavigate('/secret-santa-front/')}>Home</button>
              <button onClick={() => handleNavigate('/secret-santa-front/register')}>Register</button>
            </>
          }
        </div>
        {isMobile && <h1 className='text-slate-800 text-lg'>{user.firstName}, Welcome to Secret Santa</h1>}
        {!isMobile && <h1 className='text-slate-800'>{user.firstName}, Welcome to Secret Santa</h1>}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <button onClick={handleLogout}>Logout</button>
        </motion.div>
      </nav>
      <main style={{ flex: 1, padding: 20 }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./utils/PrivateRoute";

interface AuthProviderProps {
  children: (isAuthenticated: boolean) => React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const decodeToken = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("santaToken");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setIsAuthenticated(true);
        if (location.pathname === "/secret-santa-front/login") {
          navigate("/secret-santa-front/");
        }
      }
    }
  }, [navigate]);

  return (
    <React.Fragment>
      {children(isAuthenticated)}
    </React.Fragment>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        {(isAuthenticated) => (
          <Routes>
            <Route path="/secret-santa-front/login" element={<Login />} />
            <Route path="/secret-santa-front/register" element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Register />
              </PrivateRoute>
            } />
            <Route
              path="/secret-santa-front/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Home />
                </PrivateRoute>
              }
            />
          </Routes>
        )}
      </AuthProvider>
    </Router>
  );
};

export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="secret-santa-front/" element={<Home />} />
        <Route path="secret-santa-front/login" element={<Login />} />
        <Route path="secret-santa-front/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;

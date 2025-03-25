import React from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import UpdateUser from "./UpdateUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update/:id" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
};

export default App;

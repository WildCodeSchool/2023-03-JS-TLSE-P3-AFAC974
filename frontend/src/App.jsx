// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Modal from "react-modal";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import NavBar from "./components/NavBar";
import "./App.css";

Modal.setAppElement("#root");
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import NavBar from "./components/NavBar";
import { AddArtworkProvider } from "./context/AddArtworkContext";
import { DataProjectProvider } from "./context/DataProjectContext";
import "./App.css";

function App() {
  return (
    <DataProjectProvider>
      <AddArtworkProvider>
        <Router>
          <div className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminHome />} />
            </Routes>
          </div>
        </Router>
      </AddArtworkProvider>
    </DataProjectProvider>
  );
}

export default App;

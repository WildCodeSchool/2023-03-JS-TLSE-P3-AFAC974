// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import Modal from "react-modal";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import NavBar from "./components/NavBar";
import RoutesComponent from "./components/RouteComponents";
import { FormArtworkArtistProvider } from "./context/FormArtworkArtistContext";

Modal.setAppElement("#root");

function App() {
  return (
    <AuthProvider>
      <FormArtworkArtistProvider>
        <Router>
          <div className="App">
            <NavBar />
            <RoutesComponent />
          </div>
        </Router>
      </FormArtworkArtistProvider>
    </AuthProvider>
  );
}

export default App;

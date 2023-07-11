// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import React from "react";
import Modal from "react-modal";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import Gallery from "./pages/Gallery";
import Artwork from "./pages/Artwork";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import UsersDisplay from "./components/UsersDisplay";
import { FormArtworkArtistProvider } from "./context/FormArtworkArtistContext";
import "./App.css";

Modal.setAppElement("#root");
function App() {
  const { artworkId } = useParams();
  return (
    <FormArtworkArtistProvider>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path={`/gallery/:${artworkId}`} element={<Artwork />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/users" element={<UsersDisplay />} />
          </Routes>
        </div>
      </Router>
    </FormArtworkArtistProvider>
  );
}

export default App;

import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Home from "../pages/Home";
import AdminHome from "../pages/AdminHome";
import UserHome from "../pages/UserHome";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import Artwork from "../pages/Artwork";
import ArtworksAdministration from "../pages/ArtworksAdministration";
import UsersAdministration from "../pages/UsersAdministration";
import ArtistAdministration from "../pages/ArtistAdministration";
import UnauthorizedPage from "../pages/Unauthorized";

export default function RoutesComponent() {
  const { userRole } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={userRole === 0 ? <AdminHome /> : <UnauthorizedPage />}
      />
      <Route
        path="/admin/users"
        element={
          userRole === 0 ? <UsersAdministration /> : <UnauthorizedPage />
        }
      />
      <Route
        path="/admin/artworks"
        element={
          userRole === 0 ? <ArtworksAdministration /> : <UnauthorizedPage />
        }
      />
      <Route
        path="/admin/artists"
        element={
          userRole === 0 ? <ArtistAdministration /> : <UnauthorizedPage />
        }
      />

      <Route
        path="/user"
        element={userRole === 1 ? <UserHome /> : <UnauthorizedPage />}
      />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/gallery/:artworkId" element={<Artwork />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

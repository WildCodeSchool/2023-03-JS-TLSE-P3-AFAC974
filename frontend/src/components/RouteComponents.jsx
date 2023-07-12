import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Home from "../pages/Home";
import AdminHome from "../pages/AdminHome";
import UserHome from "../pages/UserHome";
import About from "../pages/About";
import ArtworksAdministration from "../pages/ArtworksAdministration";
import UsersAdministration from "../pages/UsersAdministration";
import ArtistsAdministration from "../pages/ArtistsAdministration";
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
        path="/user"
        element={userRole === 1 ? <UserHome /> : <UnauthorizedPage />}
      />
      <Route path="/about" element={<About />} />
      <Route
        path="/artworksadmin"
        element={
          userRole === 0 ? <ArtworksAdministration /> : <UnauthorizedPage />
        }
      />
      <Route
        path="/artistsadmin"
        element={
          userRole === 0 ? <ArtistsAdministration /> : <UnauthorizedPage />
        }
      />
      <Route
        path="/usersadmin"
        element={
          userRole === 0 ? <UsersAdministration /> : <UnauthorizedPage />
        }
      />
    </Routes>
  );
}

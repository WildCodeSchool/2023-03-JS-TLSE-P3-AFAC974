import React from "react";
import { Turn as Hamburger } from "hamburger-react";

function NavBar() {
  return (
    <div className="navbar-header">
      <img className="logo" src="/src/assets/navbar_logo.png" alt="logo" />
      <div className="navbar-links">
        <img className="flag-logo" src="/src/assets/flag_logo.png" alt="flag" />
        <img
          className="login-logo"
          src="/src/assets/login_logo.png"
          alt="login"
        />
        <div className="Hamburger">
          <Hamburger />
        </div>
      </div>
    </div>
  );
}

export default NavBar;

import React from "react";
import { Turn as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div
      className="navbar-header flex justify-between items-center bg-[#257492] h-[52px] lg:h-[60px] px-3
    "
    >
      <img
        className="logo h-[35px] w-auto sm:h-[55px] "
        src="/src/assets/navbar_logo.png"
        alt="logo"
      />
      <div className="hidden sm:flex navbar-links flex items-center gap-[100px] text-white">
        <div className="flex items-center gap-2 w-[28px] ">
          <img
            src="/src/assets/hexagon_blue_bg.png"
            alt="hexagon"
            className="h-[28px] w-[26.32 px]"
          />
          {/* Link to home page */}
          <Link to="/">HOME</Link>
        </div>
        <div className="flex items-center gap-2 w-[28px]">
          <img
            src="/src/assets/hexagon_blue_bg.png"
            alt="hexagon"
            className="h-[28px] w-[26.32 px]"
          />
          {/* Link to Gallery page */}
          <Link to="/gallery">GALERIE</Link>
        </div>
        {/* text doesn't wrap */}
        <div className="flex items-center gap-2 w-[28px] whitespace-nowrap ">
          <img
            src="/src/assets/hexagon_blue_bg.png"
            alt="hexagon"
            className="h-[28px] w-[26.32 px]"
          />
          {/* Link to About page */}
          <Link to="/about">A PROPOS</Link>
        </div>
      </div>
      <div className="navbar-links flex items-center gap-1.7 sm:gap-[10px]">
        <img
          className="flag-logo px-1.5"
          src="/src/assets/flag_logo.png"
          alt="flag"
        />
        <p className="hidden sm:block text-white font-semibold">COMPTE</p>
        <img
          className="login-logo h-[24px] px-1.5"
          src="/src/assets/login_logo.png"
          alt="login"
        />
        <div className="Hamburger lg:hidden">
          <Hamburger color="#fff" size={24} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;

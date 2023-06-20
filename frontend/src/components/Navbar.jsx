import React, { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavBar({ setLoginModalOpened, setLanguageModalOpened }) {
  const [homeHovered, setHomeHovered] = useState(false);
  const [galleryHovered, setGalleryHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);

  const handleHomeHover = () => {
    setHomeHovered(true);
  };

  const handleHomeLeave = () => {
    setHomeHovered(false);
  };

  const handleGalleryHover = () => {
    setGalleryHovered(true);
  };

  const handleGalleryLeave = () => {
    setGalleryHovered(false);
  };

  const handleAboutHover = () => {
    setAboutHovered(true);
  };

  const handleAboutLeave = () => {
    setAboutHovered(false);
  };

  return (
    <div className="navbar-header flex justify-between items-center bg-[#257492] h-[52px] lg:h-[60px] px-3">
      <img
        className="logo h-[35px] w-auto sm:h-[55px] "
        src="/src/assets/navbar_logo.png"
        alt="logo"
      />
      <div className="desktopLinks hidden sm:flex navbar-links items-center gap-[120px] text-white ">
        <div
          className={`flex items-center gap-2 w-[28px] ${
            homeHovered ? "hovered" : ""
          }`}
          onMouseEnter={handleHomeHover}
          onMouseLeave={handleHomeLeave}
        >
          <img
            src={
              homeHovered
                ? "/src/assets/hexagon_red_bg.png"
                : "/src/assets/hexagon_blue_bg.png"
            }
            alt="hexagon"
            className="h-[28px] w-[26.32px]"
          />
          <Link to="/">HOME</Link>
        </div>
        <div
          className={`flex items-center gap-2 w-[28px] ${
            galleryHovered ? "hovered" : ""
          }`}
          onMouseEnter={handleGalleryHover}
          onMouseLeave={handleGalleryLeave}
        >
          <img
            src={
              galleryHovered
                ? "/src/assets/hexagon_red_bg.png"
                : "/src/assets/hexagon_blue_bg.png"
            }
            alt="hexagon"
            className="h-[28px] w-[26.32px]"
            id="galleryPicture"
          />
          <Link to="/gallery">GALERIE</Link>
        </div>
        <div
          className={`flex items-center gap-2 w-[28px] whitespace-nowrap ${
            aboutHovered ? "hovered" : ""
          }`}
          onMouseEnter={handleAboutHover}
          onMouseLeave={handleAboutLeave}
        >
          <img
            src={
              aboutHovered
                ? "/src/assets/hexagon_red_bg.png"
                : "/src/assets/hexagon_blue_bg.png"
            }
            alt="hexagon"
            className="h-[28px] w-[26.32px] "
            id="aboutPicture"
          />
          <Link to="/about">A PROPOS</Link>
        </div>
      </div>
      <div className="navbar-links flex items-center gap-1.7 sm:gap-[10px] ">
        <button onClick={() => setLanguageModalOpened(true)} type="button">
          <img
            className="flag-logo px-1.5"
            src="/src/assets/flag_logo.png"
            alt="flag"
          />
        </button>
        <button
          onClick={() => setLoginModalOpened(true)}
          type="button"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <p className="hidden sm:block text-white ">COMPTE</p>
          <img
            className="login-logo h-[24px] px-1.5"
            src="/src/assets/login_logo.png"
            alt="login"
          />
        </button>
        <div className="Hamburger lg:hidden">
          <Hamburger color="#fff" size={24} />
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  setLoginModalOpened: PropTypes.func.isRequired,
  setLanguageModalOpened: PropTypes.func.isRequired,
};

export default NavBar;

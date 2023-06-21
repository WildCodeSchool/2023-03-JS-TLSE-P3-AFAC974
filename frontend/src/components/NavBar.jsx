import React, { useState } from "react";
import { Turn as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import LanguageMenu from "./LanguageMenu";
import Login from "./Login";

function NavBar() {
  const [homeHovered, setHomeHovered] = useState(false);
  const [galleryHovered, setGalleryHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [languageModalOpened, setLanguageModalOpened] = useState(false);

  return (
    <>
      <div className="navbar-header flex justify-between items-center bg-[#257492] h-[52px] lg:h-[60px] px-3">
        <img
          className="logo h-[35px] w-auto sm:h-[55px] "
          src="/src/assets/navbar_logo.png"
          alt="logo"
        />
        <div className="desktopLinks hidden md:flex navbar-links items-center gap-[120px] text-white ">
          <div
            className={`flex items-center gap-2 w-[28px] ${
              homeHovered ? "hovered" : ""
            }`}
            onMouseEnter={() => setHomeHovered(true)}
            onMouseLeave={() => setHomeHovered(false)}
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
            <Link to="/" className="hover:font-medium">
              HOME
            </Link>
          </div>
          <div
            className={`flex items-center gap-2 w-[28px] ${
              galleryHovered ? "hovered" : ""
            }`}
            onMouseEnter={() => setGalleryHovered(true)}
            onMouseLeave={() => setGalleryHovered(false)}
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
            <Link to="/gallery" className=" hover:font-medium">
              GALERIE
            </Link>
          </div>
          <div
            className={`flex items-center gap-2 w-[28px] whitespace-nowrap ${
              aboutHovered ? "hovered" : ""
            }`}
            onMouseEnter={() => setAboutHovered(true)}
            onMouseLeave={() => setAboutHovered(false)}
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
            <Link to="/about" className="hover:font-medium">
              A PROPOS
            </Link>
          </div>
        </div>
        <div className="navbar-links flex items-center gap-1.7 sm:gap-[10px] ">
          <button onClick={() => setLanguageModalOpened(true)} type="button">
            <img
              className="flag-logo px-1.5"
              src="/src/assets/french_flag_logo.png"
              alt="flag"
            />
          </button>
          <button
            onClick={() => setLoginModalOpened(true)}
            type="button"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <p className="hidden sm:block text-white hover:font-bold ">
              COMPTE
            </p>
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

      <LanguageMenu
        languageModalOpened={languageModalOpened}
        setLanguageModalOpened={setLanguageModalOpened}
      />

      <Login
        loginModalOpened={loginModalOpened}
        setLoginModalOpened={setLoginModalOpened}
      />
    </>
  );
}

export default NavBar;

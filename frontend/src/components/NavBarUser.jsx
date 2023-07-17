import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { Turn as Hamburger } from "hamburger-react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import Modal from "react-modal";
import AuthContext from "../context/AuthContext";
import LanguageMenu from "./LanguageMenu";
import BurgerMenu from "./BurgerMenu";
import Login from "./Login";
import RedButton from "./RedButton";
import GreyButton from "./GreyButton";
import navbarLogo from "../assets/navbar_logo.png";
import hexagonRedBg from "../assets/hexagon_red_bg.png";
import hexagonBlueBg from "../assets/hexagon_blue_bg.png";
import frenchFlagLogo from "../assets/french_flag_logo.png";

function NavBarUser() {
  const [homeHovered, setHomeHovered] = useState(false);
  const [galleryHovered, setGalleryHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [languageModalOpened, setLanguageModalOpened] = useState(false);
  const [languageChosenFlag, setLanguageChosenFlag] = useState(frenchFlagLogo);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [logedUserData, setLogedUserData] = useState(null);
  const { userId, userRole } = useContext(AuthContext);
  const toggleSectionVisibility = () => {
    setIsSectionVisible((prevVisible) => !prevVisible);
  };
  const [isModalLogOutOpen, setIsModalLogOutOpen] = useState(false);

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };
  const divRef = useRef(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/loggeduser/${userId}`)
      .then((response) => {
        setLogedUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogOut = () => {
    Cookies.remove("jwt");
    Cookies.remove("role");
    setIsModalLogOutOpen(false);
    window.location.href = "/";
  };
  const handleOpenLogOutModal = () => {
    setIsModalLogOutOpen(true);
    document.body.classList.add("disable-scroll");
  };
  const handleCloseLogOutModal = () => {
    setIsModalLogOutOpen(false);
    document.body.classList.remove("disable-scroll");
  };
  window.onscroll = function () {
    setIsSectionVisible(false);
  };

  return (
    <div className=" w-[100%] z-10 fixed top-0 left-0">
      <div className="navbar-header relative flex justify-between items-center bg-[#7F253E] h-[52px] lg:h-[60px] px-3  shadow-[0px_-3px_15px_#333]">
        <img
          className="logo h-[35px] w-auto sm:h-[55px] "
          src={navbarLogo}
          alt="logo"
        />
        <div className="desktopLinks hidden lg:flex navbar-links items-center gap-[120px] text-white ">
          <NavLink
            to="/"
            className="hover:font-medium flex items-center w-[28px]"
            onMouseEnter={() => setHomeHovered(true)}
            onMouseLeave={() => setHomeHovered(false)}
            onClick={() => setIsSectionVisible(false)}
          >
            <img
              src={homeHovered ? hexagonRedBg : hexagonBlueBg}
              alt="hexagon"
              className="h-[28px] w-[26.32px] mr-2"
            />
            <p>HOME</p>
          </NavLink>
          <NavLink
            to="/gallery"
            className="hover:font-medium flex items-center w-[28px]"
            onMouseEnter={() => setGalleryHovered(true)}
            onMouseLeave={() => setGalleryHovered(false)}
            onClick={() => setIsSectionVisible(false)}
          >
            <img
              src={galleryHovered ? hexagonRedBg : hexagonBlueBg}
              alt="hexagon"
              className="h-[28px] w-[26.32px] mr-2"
            />
            <p>GALERIE</p>
          </NavLink>
          <NavLink
            to="/about"
            className="hover:font-medium flex items-center w-[28px] whitespace-nowrap"
            onMouseEnter={() => setAboutHovered(true)}
            onMouseLeave={() => setAboutHovered(false)}
            onClick={() => setIsSectionVisible(false)}
          >
            <img
              src={aboutHovered ? hexagonRedBg : hexagonBlueBg}
              alt="hexagon"
              className="h-[28px] w-[26.32px] mr-2 "
            />
            <p>A PROPOS</p>
          </NavLink>
        </div>
        <div className="navbar-links flex items-center gap-1.7 sm:gap-[10px] ">
          <button onClick={() => setLanguageModalOpened(true)} type="button">
            <img
              className="flag-logo px-1.5"
              src={languageChosenFlag}
              alt="flag"
            />
          </button>
          <button
            onClick={toggleSectionVisibility}
            type="button"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <img
              className="rounded-full w-11 h-11 object-cover"
              src={logedUserData && logedUserData[0] && logedUserData[0].image}
              alt="login"
            />
          </button>
          <div
            ref={divRef}
            className={`bg-white text-left fixed right-0 top-14 mt-2 transition-all duration-500 w-[20dvw]  ${
              isSectionVisible
                ? "transform translate-x-0"
                : "transform translate-x-full"
            }`}
          >
            <section className="w-full flex flex-col p-2 gap-2 border-4 border-red-950 border-solid">
              {logedUserData && logedUserData[0] && (
                <section className="flex gap-3 border-2 border-gray-400 border-solid">
                  <img
                    src={logedUserData[0].image}
                    alt="profil pic"
                    className="rounded-full w-11 h-11 object-cover"
                  />
                  <div>
                    <p>
                      {logedUserData[0].lastname}&nbsp;
                      {logedUserData[0].firstname}
                    </p>
                    <p>{logedUserData[0].email}</p>
                  </div>
                </section>
              )}
              <NavLink to="/admin" onClick={() => setIsSectionVisible(false)}>
                <p className="text-black">Profil</p>
              </NavLink>
              <NavLink onClick={() => setIsSectionVisible(false)}>
                <p>Paramètres</p>
              </NavLink>
              {userRole === 0 && (
                <div className="flex flex-col gap-2">
                  <NavLink
                    to="/admin/artworks"
                    onClick={() => setIsSectionVisible(false)}
                  >
                    <p>Oeuvres</p>
                  </NavLink>
                  <NavLink
                    to="/admin/artists"
                    onClick={() => setIsSectionVisible(false)}
                  >
                    <p>Artists</p>
                  </NavLink>
                  <NavLink
                    to="/admin/users"
                    onClick={() => setIsSectionVisible(false)}
                  >
                    <p>Users</p>
                  </NavLink>
                </div>
              )}

              <button type="button" onClick={handleOpenLogOutModal}>
                <p className="text-left text-sm">Déconnexion</p>
              </button>
            </section>
          </div>

          <Modal
            isOpen={isModalLogOutOpen}
            style={customModalStyles}
            className=" w-[95%] fixed top-[45%] xl:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex"
            contentLabel="Modal"
          >
            <div className="bg-white w-[25%] rounded-xl text-center flex flex-col gap-6 mx-auto p-5">
              <h2 className="text-xl">
                Etes vous sur de vouloir vous déconnecter ?
              </h2>
              <RedButton
                text="Oui, me déconnecter"
                type="button"
                onClick={handleLogOut}
              />
              <GreyButton
                text="Non, rester connecté"
                type="button"
                onClick={handleCloseLogOutModal}
              />
            </div>
          </Modal>
        </div>
        <div className="Hamburger lg:hidden">
          <Hamburger
            color="#fff"
            size={24}
            toggled={burgerMenuOpen}
            toggle={setBurgerMenuOpen}
          />
        </div>
      </div>

      <LanguageMenu
        languageModalOpened={languageModalOpened}
        setLanguageModalOpened={setLanguageModalOpened}
        setLanguageChosenFlag={setLanguageChosenFlag}
      />

      <Login
        loginModalOpened={loginModalOpened}
        setLoginModalOpened={setLoginModalOpened}
      />

      <BurgerMenu burgerMenuOpen={burgerMenuOpen} />
    </div>
  );
}

export default NavBarUser;

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import arrow from "../assets/arrow.png";

function BurgerMenu({ burgerMenuOpen, setBurgerMenuOpen }) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      zIndex: 1000,
    },
  };
  return (
    <ReactModal
      isOpen={burgerMenuOpen}
      onRequestClose={() => setBurgerMenuOpen(false)}
      ariaHideApp={false}
      className="w-[90vw] shadow-md z-20  drop-shadow-sm rounded-lg flex flex-col items-center mx-auto my-[8px]font-bold text-xl px-[20px] py-[10px] mt-[60px] justify-between gap-4 bg-white"
      style={customModalStyles}
    >
      <Link
        to="/"
        className="flex w-[100%] justify-between items-center py-[4px]"
        onClick={() => setBurgerMenuOpen(false)}
      >
        ACCUEIL
        <img src={arrow} alt="flèche" />
      </Link>
      <Link
        to="/gallery"
        className="flex w-[100%] justify-between items-center py-[4px]"
        onClick={() => setBurgerMenuOpen(false)}
      >
        GALERIE
        <img src={arrow} alt="flèche" />
      </Link>
      <Link
        to="/about"
        className="flex w-[100%] justify-between items-center pt-[4px]"
        onClick={() => setBurgerMenuOpen(false)}
      >
        A PROPOS
        <img src={arrow} alt="flèche" />
      </Link>
    </ReactModal>
  );
}

BurgerMenu.propTypes = {
  burgerMenuOpen: PropTypes.bool.isRequired,
  setBurgerMenuOpen: PropTypes.func.isRequired,
};

export default BurgerMenu;

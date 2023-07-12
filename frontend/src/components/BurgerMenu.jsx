import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import arrow from "../assets/arrow.png";

function BurgerMenu({ burgerMenuOpen }) {
  return (
    <div
      className={`transition-container  relative transition-transform duration-500 py-[16px] ${
        burgerMenuOpen ? "translate-x-0" : "hidden"
      }`}
    >
      <div
        className={`w-[90vw] shadow-md  drop-shadow-sm rounded-lg flex flex-col items-center mx-auto my-[8px]font-bold text-xl px-[20px] py-[10px] justify-between gap-4 bg-white ${
          burgerMenuOpen ? "transform translate-x-0" : "hidden"
        }`}
      >
        <Link
          to="/"
          className="flex w-[100%] justify-between items-center py-[4px]"
        >
          ACCUEIL
          <img src={arrow} alt="flèche" />
        </Link>
        <Link
          to="/gallery"
          className="flex w-[100%] justify-between items-center py-[4px]"
        >
          GALERIE
          <img src={arrow} alt="flèche" />
        </Link>
        <Link
          to="/about"
          className="flex w-[100%] justify-between items-center pt-[4px]"
        >
          A PROPOS
          <img src={arrow} alt="flèche" />
        </Link>
      </div>
    </div>
  );
}

BurgerMenu.propTypes = {
  burgerMenuOpen: PropTypes.bool.isRequired,
};

export default BurgerMenu;

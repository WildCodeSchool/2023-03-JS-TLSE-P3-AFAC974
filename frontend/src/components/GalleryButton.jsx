import React from "react";
import hexagonBlueBg from "../assets/hexagon_blue_bg.png";

function GalleryButton() {
  return (
    <button
      className=" w-[190px] h-[45px] flex flex-row justify-center items-center gap-4 bg-[#7F253E] text-[#e2e3e4] px-[10px] py-[2px] rounded-[8px] text-[18px] shadow-[5px_5px_15px_#222] md:h-[60px] md:w-[280px] md:text-[21px]"
      type="button"
    >
      <img className="hidden md:block" src={hexagonBlueBg} alt="logo bleu" />
      Découvrez la galerie
    </button>
  );
}

export default GalleryButton;

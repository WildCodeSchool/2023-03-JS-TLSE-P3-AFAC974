import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import frenchFlagLogo from "../assets/french_flag_logo.png";
import englishFlagLogo from "../assets/english_flag_logo.png";
import creoleFlagLogo from "../assets/creole_flag_logo.png";

function LanguageMenu({
  languageModalOpened,
  setLanguageModalOpened,
  setLanguageChosenFlag,
}) {
  return (
    <ReactModal
      isOpen={languageModalOpened}
      onRequestClose={() => setLanguageModalOpened(false)}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "20",
          backdropFilter: "blur(6px)",
        },
        content: {
          backgroundColor: "#fff",
          color: "#000",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          width: "300px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "15px",
        },
      }}
    >
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="font-semibold text-2xl">Choisissez une langue</h1>
        <button
          className="w-[120px] h-[44px] flex justify-between items-center bg-gray-200 shadow-xs rounded-lg px-[8px] text-main-blue  hover:bg-[#257492] hover:text-white"
          type="button"
          onClick={() => {
            setLanguageChosenFlag(frenchFlagLogo);
            setLanguageModalOpened(false);
          }}
        >
          <p className="text-base font-semibold font-inter leading-6">
            Français
          </p>
          <img src={frenchFlagLogo} alt="french flag" className="w-[20px]" />
        </button>
        <button
          className="w-[120px] h-[44px] flex justify-between items-center bg-gray-200 shadow-xs rounded-lg px-[8px] text-main-blue  hover:bg-[#257492] hover:text-white"
          type="button"
          onClick={() => {
            setLanguageChosenFlag(englishFlagLogo);
            setLanguageModalOpened(false);
          }}
        >
          <p className="text-base font-semibold font-inter leading-6">
            English
          </p>
          <img src={englishFlagLogo} alt="english flag" />
        </button>
        <button
          className="w-[120px] h-[44px] flex justify-between items-center bg-gray-200 shadow-xs rounded-lg px-[8px] text-main-blue  hover:bg-[#257492] hover:text-white"
          type="button"
          onClick={() => {
            setLanguageChosenFlag(creoleFlagLogo);
            setLanguageModalOpened(false);
          }}
        >
          <p className="text-base font-semibold font-inter leading-6">Créole</p>
          <img src={creoleFlagLogo} alt="creole flag" />
        </button>
      </div>
    </ReactModal>
  );
}

LanguageMenu.propTypes = {
  languageModalOpened: PropTypes.bool.isRequired,
  setLanguageModalOpened: PropTypes.func.isRequired,
  setLanguageChosenFlag: PropTypes.func.isRequired,
};

export default LanguageMenu;

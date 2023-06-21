import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

function LanguageMenu({ languageModalOpened, setLanguageModalOpened }) {
  return (
    <ReactModal
      isOpen={languageModalOpened}
      onRequestClose={() => setLanguageModalOpened(false)}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          backgroundColor: "#fff",
          color: "#000",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40%",
          width: "40%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <div>
        <h1>Choisissez une langue</h1>
        <div>
          <img src="" alt="" />
          <p>Français</p>
        </div>
        <div>
          <img src="" alt="" />
          <p>English</p>
        </div>
        <div>
          <img src="" alt="" />
          <p>Créole</p>
        </div>
      </div>
    </ReactModal>
  );
}

LanguageMenu.propTypes = {
  languageModalOpened: PropTypes.bool.isRequired,
  setLanguageModalOpened: PropTypes.func.isRequired,
};

export default LanguageMenu;

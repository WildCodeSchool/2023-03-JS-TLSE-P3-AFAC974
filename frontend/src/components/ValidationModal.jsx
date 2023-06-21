import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Validation from "../assets/Validation.png";

function ValidationModal({
  isOpenModalValidation,
  onCloseModalValidation,
  textValidationModal,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getModalWidth = () => {
    if (windowWidth < 1024) {
      return "80vw";
    }
    return "400px";
  };

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      border: "none",
      borderRadius: "20px",
      padding: "20px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: getModalWidth(),
      height: "fit-content",
      overflow: "auto",
      background: "#fff",
      display: "flex",
    },
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onCloseModalValidation();
    }, 2000); // 2 secondes

    return () => clearTimeout(timeout);
  }, [isOpenModalValidation]);

  const handleCloseModal = () => {
    onCloseModalValidation();
  };

  return (
    <ReactModal
      isOpen={isOpenModalValidation}
      onRequestClose={handleCloseModal}
      onAfterClose={onCloseModalValidation}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <div className="flex flex-col-reverse justify-center items-center w-full">
        <img
          className="validation-picture w-[70px] h-[70px]"
          src={Validation}
          alt="Validate"
        />
        <p className="font-semibold text-[30px] py-[20px] text-center">
          {textValidationModal}
        </p>
      </div>
    </ReactModal>
  );
}

ValidationModal.propTypes = {
  isOpenModalValidation: PropTypes.bool,
  onCloseModalValidation: PropTypes.func,
  textValidationModal: PropTypes.string,
};

ValidationModal.defaultProps = {
  isOpenModalValidation: false,
  onCloseModalValidation: () => {},
  textValidationModal: "Pris en compte",
};

export default ValidationModal;

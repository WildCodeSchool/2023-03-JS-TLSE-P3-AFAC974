import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import Validation from "../assets/Validation.png";

function ValidationModal({
  isOpenModalValidation,
  setModalValidation,
  textValidationModal,
}) {
  // setter with use effect for have a style responsive
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
      return "60vw";
    }
    return "25%";
  };

  const getModalheight = () => {
    if (windowWidth < 1024) {
      return "fit-content";
    }
    return "30vh";
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
      height: getModalheight(),
      overflow: "auto",
      background: "#fff",
      display: "flex",
    },
  };

  // useEffect for close modal after 2 secondes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setModalValidation(false);
    }, 2000); // 2 secondes

    return () => clearTimeout(timeout);
  }, [isOpenModalValidation]);

  return (
    <ReactModal
      isOpen={isOpenModalValidation}
      onRequestClose={() => setModalValidation(false)}
      onAfterClose={() => setModalValidation(false)}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <div className="flex flex-col-reverse justify-center items-center w-full">
        <img
          className="validation-picture w-[70px] h-[70px]"
          src={Validation}
          alt="Validate"
        />
        <h1 className="font-semibold text-[20px] lg:text-[30px] py-[20px] text-center ">
          {textValidationModal}
        </h1>
      </div>
    </ReactModal>
  );
}

ValidationModal.propTypes = {
  isOpenModalValidation: PropTypes.bool,
  setModalValidation: PropTypes.func,
  textValidationModal: PropTypes.string,
};

ValidationModal.defaultProps = {
  isOpenModalValidation: false,
  setModalValidation: () => {},
  textValidationModal: "Pris en compte",
};

export default ValidationModal;

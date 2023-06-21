import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import RedButton from "./RedButton";
import GreyButton from "./GreyButton";

function ConfirmationModal({
  isOpenModalConfirmation,
  onCloseModalConfirmation,
  textConfirmationModal,
  setStep,
  setModalValidation,
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

  const handleCancel = () => {
    setStep(1);
    onCloseModalConfirmation();
  };
  const handleSubmit = () => {
    setStep(1);
    onCloseModalConfirmation();
    setModalValidation(true);
  };

  return (
    <ReactModal
      isOpen={isOpenModalConfirmation}
      onRequestClose={handleSubmit}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <div className="flex flex-col justify-center">
        <p className="font-semibold text-[20px] py-[10px] text-center">
          {textConfirmationModal}
        </p>
        <div className="flex flex-col-reverse justify-between w-[100%]">
          <div className="w-[100%] py-[5px] text-[20px] h-[55px]">
            <GreyButton text="Annuler" onClick={handleCancel} />
          </div>
          <div className="w-[100%] py-[5px] text-[20px] h-[55px]">
            <RedButton text="Confirmer" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

ConfirmationModal.propTypes = {
  isOpenModalConfirmation: PropTypes.bool,
  onCloseModalConfirmation: PropTypes.func,
  textConfirmationModal: PropTypes.string,
  setStep: PropTypes.func,
  setModalValidation: PropTypes.func,
};

ConfirmationModal.defaultProps = {
  isOpenModalConfirmation: false,
  onCloseModalConfirmation: () => {},
  textConfirmationModal: "",
  setStep: () => {},
  setModalValidation: () => {},
};

export default ConfirmationModal;

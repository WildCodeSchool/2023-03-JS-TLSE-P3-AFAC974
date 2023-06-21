import React from "react";
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
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      border: "none",
      borderRadius: "4px",
      padding: "20px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      maxHeight: "80vh",
      overflow: "auto",
      background: "#fff",
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
      <div>
        <p>{textConfirmationModal}</p>
        <div>
          <GreyButton text="Annuler" onClick={handleCancel} />
          <RedButton text="Valider" onClick={handleSubmit} />
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

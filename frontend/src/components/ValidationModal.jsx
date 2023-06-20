import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ReactModal from "react-modal";
import Validation from "../assets/Validation.png";

function ValidationModal({
  isOpenModalValidation,
  onCloseModalValidation,
  textValidationModal,
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
      <div>
        <img className="validation-picture" src={Validation} alt="Validate" />
        <p>{textValidationModal}</p>
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

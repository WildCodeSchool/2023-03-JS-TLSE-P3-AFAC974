import PropTypes from "prop-types";
import React, { useEffect } from "react";
import ReactModal from "react-modal";

function ValidationModal({
  isOpenModalValidation,
  setModalValidation,
  textValidationModal,
  pictureValidationModal,
}) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
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
      className="h-fit md:h-[30vh] lg:h-[35vh] max-h-[40vh] w-fit max-w-[40vh] border-none rounded-2xl p-20 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
    >
      <div className="flex flex-col-reverse justify-center items-center w-full">
        <img
          className="validation-picture w-[70px] h-[70px]"
          src={pictureValidationModal}
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
  pictureValidationModal: PropTypes.string,
};

ValidationModal.defaultProps = {
  isOpenModalValidation: false,
  setModalValidation: () => {},
  textValidationModal: "Pris en compte",
  pictureValidationModal: "",
};

export default ValidationModal;

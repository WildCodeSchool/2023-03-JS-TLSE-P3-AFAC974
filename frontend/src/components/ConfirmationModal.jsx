/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import RedButton from "./RedButton";
import GreyButton from "./GreyButton";

function ConfirmationModal({
  isOpenModalConfirmation,
  setModalConfirmation,
  textConfirmationModal,
  setStep,
  setModalValidation,
  handleArtworkUpload,
}) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  const handleCancel = () => {
    setStep(1);
    setModalConfirmation(false);
  };
  const handleSubmit = () => {
    setStep(1);
    setModalConfirmation(false);
    setModalValidation(true);
  };

  return (
    <ReactModal
      isOpen={isOpenModalConfirmation}
      style={customModalStyles}
      ariaHideApp={false}
      className="h-fit md:h-[30vh] lg:h-[35vh] w-fit md:w-[30vw] lg:w-[30vw] lg:max-w-[25vw] border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
    >
      <div className="flex flex-col justify-center items-center w-[100%]">
        <p className="font-semibold text-[20px] py-[10px] text-center">
          {textConfirmationModal}
        </p>
        <div className="flex flex-col-reverse justify-between w-[75%]">
          <div className="w-[100%] py-[5px] text-[16px] h-[55px]">
            <GreyButton text="Annuler" onClick={handleCancel} />
          </div>
          <div className="w-[100%] py-[5px] text-[16px] h-[55px]">
            <RedButton
              text="Confirmer"
              onClick={() => {
                handleSubmit();
                handleArtworkUpload();
              }}
            />
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

ConfirmationModal.propTypes = {
  isOpenModalConfirmation: PropTypes.bool,
  setModalConfirmation: PropTypes.func,
  textConfirmationModal: PropTypes.string,
  setStep: PropTypes.func,
  setModalValidation: PropTypes.func,
};

ConfirmationModal.defaultProps = {
  isOpenModalConfirmation: false,
  setModalConfirmation: () => {},
  textConfirmationModal: "",
  setStep: () => {},
  setModalValidation: () => {},
};

export default ConfirmationModal;

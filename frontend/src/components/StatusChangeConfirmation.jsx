import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

function StatusChangeConfirmation({
  isOpenStatusChangeConfirmation,
  handleStatusChange,
  setIsOpenStatusChangeConfirmation,
  formEvent,
}) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };
  return (
    <ReactModal
      isOpen={isOpenStatusChangeConfirmation}
      style={customModalStyles}
      ariaHideApp={false}
      onRequestClose={() => {
        setIsOpenStatusChangeConfirmation(false);
      }}
      shouldCloseOnOverlayClick
      className="h-fit md:h-[30vh] lg:h-[35vh] w-fit md:w-[30vw] lg:w-[30vw] lg:max-w-[25vw] border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
    >
      <button
        type="button"
        onClick={() => {
          handleStatusChange(formEvent);
          setIsOpenStatusChangeConfirmation(false);
        }}
      >
        Confirmer
      </button>
    </ReactModal>
  );
}

StatusChangeConfirmation.propTypes = {
  isOpenStatusChangeConfirmation: PropTypes.bool.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  setIsOpenStatusChangeConfirmation: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  formEvent: PropTypes.object.isRequired,
};

export default StatusChangeConfirmation;

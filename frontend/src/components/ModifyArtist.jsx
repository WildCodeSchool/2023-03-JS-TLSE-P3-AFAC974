import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import ArtistFormModify from "./FormModify/ArtistFormModify";

function ModifyArtist({
  isOpen,
  setModalOpen,
  setModalConfirmation,
  handleCancel,
  selectedArtistId,
}) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  const handleSubmit = () => {
    setModalOpen(false);
    setModalConfirmation(true);
  };

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleCancel}
        style={customModalStyles}
        ariaHideApp={false}
        className="h-fit lg:h-fit min-h-[30vh] sm:min-h-[50vh] max-h-[80vh] lg:max-h-[70vh] w-[60vw] lg:w-[60vw] min-w-[45vw] lg:min-w-[600px] max-w-[90vw] md:max-w-[40vw] lg:max-w-[30vw] border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
      >
        <div className="w-full">
          <ArtistFormModify
            nextStep={handleSubmit}
            prevStep={handleCancel}
            selectedArtistId={selectedArtistId}
          />
        </div>
      </ReactModal>
    </div>
  );
}

ModifyArtist.propTypes = {
  isOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  setModalConfirmation: PropTypes.func,
  handleCancel: PropTypes.func.isRequired,
  selectedArtistId: PropTypes.number,
};

ModifyArtist.defaultProps = {
  isOpen: false,
  setModalOpen: () => {},
  setModalConfirmation: () => {},
  selectedArtistId: 0,
};

export default ModifyArtist;

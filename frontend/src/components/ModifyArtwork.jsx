import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import ArtworkFormModify from "./FormModify/ArtworkFormModify";

function ModifyArtwork({
  isOpen,
  setModalOpen,
  setModalConfirmation,
  handleCancel,
  selectedArtworkId,
  selectedArtistId,
  selectedTypeId,
  selectedTechniqueId,
  selectedArtTrendId,
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

  const modify = true;

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
          <ArtworkFormModify
            nextStep={handleSubmit}
            selectedArtworkId={selectedArtworkId}
            modify={modify}
            selectedTypeId={selectedTypeId}
            selectedTechniqueId={selectedTechniqueId}
            selectedArtTrendId={selectedArtTrendId}
            selectedArtistId={selectedArtistId}
          />
        </div>
      </ReactModal>
    </div>
  );
}

ModifyArtwork.propTypes = {
  isOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  setModalConfirmation: PropTypes.func,
  handleCancel: PropTypes.func.isRequired,
  selectedArtworkId: PropTypes.number,
  selectedTypeId: PropTypes.number,
  selectedTechniqueId: PropTypes.number,
  selectedArtTrendId: PropTypes.number,
  selectedArtistId: PropTypes.number,
};

ModifyArtwork.defaultProps = {
  isOpen: false,
  setModalOpen: () => {},
  setModalConfirmation: () => {},
  selectedArtworkId: 1,
  selectedTypeId: 1,
  selectedTechniqueId: 1,
  selectedArtTrendId: 1,
  selectedArtistId: 1,
};

export default ModifyArtwork;

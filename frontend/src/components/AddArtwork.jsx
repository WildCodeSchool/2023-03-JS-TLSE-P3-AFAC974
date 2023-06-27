import React, { useState, useRef } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import ArtworkForm1 from "./ArtworkForm/ArtworkForm1";
import ArtworkForm2 from "./ArtworkForm/ArtworkForm2";
import ArtworkForm3 from "./ArtworkForm/ArtworkForm3";

function AddArtwork({
  isOpen,
  setModalOpen,
  step,
  setStep,
  setModalConfirmation,
}) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  // useRef is used for initialize the scroll to the top when you switch
  const modalRef = useRef(null);
  const nextStep = () => {
    setStep(step + 1);
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  const handleSubmit = () => {
    setStep(1);
    setModalOpen(false);
    setModalConfirmation(true);
  };

  const [formData, setFormData] = useState({
    artworkName: "",
    artistName: "",
    creationYear: "",
    artworkDescription: "",
    lengthArtwork: "",
    widthArtwork: "",
    heightArtwork: "",
    typeArtwork: "",
    artTrendArtwork: "",
    artworkTechnical: "",
    lastnameArtist: "",
    firstnameArtist: "",
    usualName: "",
    artistDescription: "",
    artistTechnical: "",
    artTrendArtist: "",
    webSite: "",
    facebook: "",
    twitter: "",
    instagram: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <ArtworkForm1
            onClick={nextStep}
            setStep={setStep}
            setModalOpen={setModalOpen}
            text="Ajouter une image de l'oeuvre"
          />
        );
      case 2:
        return (
          <ArtworkForm2
            formData={formData}
            handleInputChange={handleInputChange}
            modalRef={modalRef}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <ArtworkForm3
            formData={formData}
            handleInputChange={handleInputChange}
            modalRef={modalRef}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <ArtworkForm1
            onClick={handleSubmit}
            setStep={setStep}
            setModalOpen={setModalOpen}
            text="Ajouter une photo de l'artiste"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => {
          setModalOpen(false);
          setStep(1);
        }}
        style={customModalStyles}
        ariaHideApp={false}
        className="h-fit lg:h-[610px] min-h-[30vh] sm:min-h-[50vh] max-h-[80vh] lg:max-h-[60vh] w-[60vw] lg:w-[50vw] min-w-[50vw] lg:min-w-[42vw] lg:max-w-[30vw] max-w-90vw  border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
      >
        <form className="w-full">{renderContent()}</form>
      </ReactModal>
    </div>
  );
}

AddArtwork.propTypes = {
  isOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  step: PropTypes.number,
  setStep: PropTypes.func,
  setModalConfirmation: PropTypes.func,
};

AddArtwork.defaultProps = {
  isOpen: false,
  setModalOpen: () => {},
  step: 1,
  setStep: () => {},
  setModalConfirmation: () => {},
};

export default AddArtwork;

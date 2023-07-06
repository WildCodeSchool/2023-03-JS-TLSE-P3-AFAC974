import React, { useRef, useContext } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import ArtworkForm1 from "./ArtworkForm/ArtworkForm1";
import ArtworkForm2 from "./ArtworkForm/ArtworkForm2";
import ArtworkForm3 from "./ArtworkForm/ArtworkForm3";
import { AddArtworkContext } from "../context/AddArtworkContext";

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

  const {
    setFormArtwork,
    setFormArtist,
    setFormType,
    setFormTechnique,
    setFormArtTrend,
    artworkPreview,
    setArtworkPreview,
    artistPreview,
    setArtistPreview,
    setFormArtTrendArtist,
    setFormArtistTechnique,
    handleInputChangeArtist,
    handleInputChangeArtwork,
    artist,
    artTrend,
    technique,
  } = useContext(AddArtworkContext);

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
    setFormArtTrendArtist({ artiste_id: artist, art_trend_id: artTrend });
    setFormArtistTechnique({ artiste_id: artist, technique_id: technique });
  };

  const handleCancel = () => {
    setStep(1);
    setModalOpen(false);
    setArtworkPreview("");
    setArtistPreview("");
    setFormArtwork({
      image_url_small: "",
      image_url_medium: "",
      image_url_large: "",
      name: "",
      year: "",
      description: "",
      art_trend_id: "",
      type_id: "",
      technique_id: "",
      artist: "",
      width_cm: "",
      length_cm: "",
      height_cm: "",
    });
    setFormArtist({
      image_url_small: "",
      image_url_medium: "",
      image_url_large: "",
      lastname: "",
      firstname: "",
      nickname: "",
      description: "",
      webSite_url: "",
      facebook_url: "",
      instagram_url: "",
      twitter_url: "",
    });
    setFormType({ name: "" });
    setFormArtTrend({ name: "" });
    setFormTechnique({ name: "" });
    setFormArtTrendArtist({ artiste_id: "", art_trend_id: "" });
    setFormArtistTechnique({ artiste_id: "", technique_id: "" });
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <ArtworkForm1
            onClickNext={nextStep}
            onClickPrev={handleCancel}
            setStep={setStep}
            setModalOpen={setModalOpen}
            text="Ajouter une image de l'oeuvre"
            textPrev="Annuler"
            textNext="Suivant"
            onChange={handleInputChangeArtwork}
            imagePreview={artworkPreview}
          />
        );
      case 2:
        return (
          <ArtworkForm2
            modalRef={modalRef}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <ArtworkForm3
            modalRef={modalRef}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <ArtworkForm1
            onClickNext={handleSubmit}
            onClickPrev={prevStep}
            setStep={setStep}
            setModalOpen={setModalOpen}
            text="Ajouter une photo de l'artiste"
            textPrev="Précédent"
            textNext="Valider"
            onChange={handleInputChangeArtist}
            imagePreview={artistPreview}
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
          setFormArtwork({
            image: "",
            name: "",
            year: "",
            description: "",
            art_trend_id: "",
            type_id: "",
            technique_id: "",
            artist: "",
            width_cm: "",
            length_cm: "",
            height_cm: "",
          });
          setFormArtist({
            image: "",
            lastname: "",
            firstname: "",
            nickname: "",
            description: "",
            webSite_url: "",
            facebook_url: "",
            instagram_url: "",
            twitter_url: "",
          });
          setFormType({ name: "" });
          setFormArtTrend({ name: "" });
          setFormTechnique({ name: "" });
        }}
        style={customModalStyles}
        ariaHideApp={false}
        className="h-fit lg:h-[610px] min-h-[30vh] sm:min-h-[50vh] max-h-[80vh] lg:max-h-[70vh] w-[60vw] lg:w-[50vw] min-w-[45vw] lg:min-w-[600px] max-w-[90vw] md:max-w-[40vw] lg:max-w-[30vw] border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
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

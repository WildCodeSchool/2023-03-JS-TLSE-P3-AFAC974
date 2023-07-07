/* eslint-disable no-unused-vars */
import React, { useRef, useContext, useEffect, useState } from "react";
import axios from "axios";
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
    // artisteTechniqueUpload,
    setArtisteTechniqueUpload,
    // artTrendArtistUpload,
    setArtTrendArtistUpload,
    artist,
    artTrend,
    technique,
    handleJointureArtisteTechnique,
    handleJointureArtisteArtTrend,
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

  const handleCancel = () => {
    setStep(1);
    setModalOpen(false);
    setArtworkPreview("");
    setArtistPreview("");
    setFormArtwork({
      name: "",
      year: "",
      description: "",
      imageUrlSmall: "",
      imageUrlMedium: "",
      imageUrlLarge: "",
      artTrendId: "",
      typeId: "",
      techniqueId: "",
      artistId: "",
      widthCm: "",
      heightCm: "",
      depthCm: "",
      artworkLocation: "",
    });
    setFormArtist({
      lastname: "",
      firstname: "",
      nickname: "",
      description: "",
      imageUrlSmall: "",
      imageUrlMedium: "",
      imageUrlLarge: "",
      websiteUrl: "",
      facebookUrl: "",
      instagramUrl: "",
      twitterUrl: "",
    });
    setFormType({ name: "" });
    setFormArtTrend({ name: "" });
    setFormTechnique({ name: "" });
    setFormArtTrendArtist({ artistId: "", artTrendId: "" });
    setFormArtistTechnique({ artistId: "", techniqueId: "" });
  };

  const [isLoadedArtist, setIsLoadedArtist] = useState(false);
  const [isLoadedType, setIsLoadedType] = useState(false);
  const [isLoadedTechnique, setIsLoadedTechnique] = useState(false);
  const [isLoadedArtTrend, setIsLoadedArtTrend] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isLoadedArtistTechnique, setIsLoadedArtistTechnique] = useState(false);
  const [isLoadedArtTrendArtist, setIsLoadedArtTrendArtist] = useState(false);
  const [dataArtist, setDataArtist] = useState(false);
  const [dataType, setDataType] = useState(false);
  const [dataTechnique, setDataTechnique] = useState(false);
  const [dataArtTrend, setDataArtTrend] = useState(false);
  const [dataArtistTechnique, setDataArtistTechnique] = useState(false);
  const [dataArtTrendArtist, setDataArtTrendArtist] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists`)
      .then((res) => {
        setDataArtist(res.data);
        setIsLoadedArtist(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/type`)
      .then((res) => {
        setDataType(res.data);
        setIsLoadedType(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/technique`)
      .then((res) => {
        setDataTechnique(res.data);
        setIsLoadedTechnique(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/arttrend`)
      .then((res) => {
        setDataArtTrend(res.data);
        setIsLoadedArtTrend(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artisttechnique`)
      .then((res) => {
        setDataArtistTechnique(res.data);
        setIsLoadedArtistTechnique(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/arttrendartist`)
      .then((res) => {
        setDataArtTrendArtist(res.data);
        setIsLoadedArtTrendArtist(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const jointureVerify = () => {
    const foundArtTrendArtist = dataArtTrendArtist.some(
      (item) =>
        item.artist_id === parseInt(artist, 10) &&
        item.art_trend_id === parseInt(artTrend, 10)
    );
    setArtTrendArtistUpload(foundArtTrendArtist);

    const foundArtistTechnique = dataArtistTechnique.some(
      (item) =>
        item.artist_id === parseInt(artist, 10) &&
        item.technique_id === parseInt(technique, 10)
    );
    setArtisteTechniqueUpload(foundArtistTechnique);
  };

  const handleSubmit = () => {
    jointureVerify();
    setStep(1);
    setModalOpen(false);
    setModalConfirmation(true);
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
            jointureVerify={jointureVerify}
            modalRef={modalRef}
            prevStep={prevStep}
            nextStep={
              parseInt(artist, 10) === dataArtist.length + 1
                ? nextStep
                : handleSubmit
            }
            isLoadedArtist={isLoadedArtist}
            isLoadedType={isLoadedType}
            isLoadedTechnique={isLoadedTechnique}
            isLoadedArtTrend={isLoadedArtTrend}
            dataArtist={dataArtist}
            dataType={dataType}
            dataTechnique={dataTechnique}
            dataArtTrend={dataArtTrend}
            handleJointureArtisteArtTrend={handleJointureArtisteArtTrend}
            handleJointureArtisteTechnique={handleJointureArtisteTechnique}
          />
        );
      case 3:
        return (
          <ArtworkForm3
            modalRef={modalRef}
            prevStep={prevStep}
            nextStep={nextStep}
            dataType={dataType}
            dataTechnique={dataTechnique}
            dataArtTrend={dataArtTrend}
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

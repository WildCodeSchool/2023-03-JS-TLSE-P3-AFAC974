import React, { useState, useContext } from "react";
import axios from "axios";
import AddArtwork from "../components/AddArtwork";
import ValidationModal from "../components/ValidationModal";
import ConfirmationModal from "../components/ConfirmationModal";
import Validation from "../assets/Validation.png";
import Erreur from "../assets/Erreur.png";
import { DataProjectContext } from "../context/DataProjectContext";
import { AddArtworkContext } from "../context/AddArtworkContext";

export default function ArtworksAdministration() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalValidation, setModalValidation] = useState(false);
  const [step, setStep] = useState(1);

  const openModal = () => {
    setModalOpen(true);
  };

  const {
    dataArtist,
    dataType,
    dataTechnique,
    dataArtTrend,
    dataArtistTechnique,
    dataArtTrendArtist,
  } = useContext(DataProjectContext);

  const {
    artist,
    type,
    artTrend,
    technique,
    formArtwork,
    formArtist,
    formType,
    formTechnique,
    formArtTrend,
    formArtTrendArtist,
    formArtistTechnique,
  } = useContext(AddArtworkContext);

  const [artisteTechniqueUpload, setArtisteTechniqueUpload] = useState(false);
  const [artTrendArtistUpload, setArtTrendArtistUpload] = useState(false);

  // console.log("formArtTrend:", formArtTrend);
  // console.log("formArtTrendArtist:", formArtTrendArtist);
  // console.log("formArtist:", formArtist);
  // console.log("formArtistTechnique:", formArtistTechnique);
  // console.log("formArtwork:", formArtwork);
  // console.log("formTechnique:", formTechnique);
  // console.log("formType:", formType);

  const handleArtworkUpload = async () => {
    let rollbackData = [];
    let typeResponse;
    let techniqueResponse;
    let artTrendResponse;
    let artistResponse;
    let artTrendArtistResponse;
    let artistTechniqueResponse;

    for (let i = 0; i < dataArtTrendArtist.length; i += 1) {
      if (
        dataArtTrendArtist[i].artist_id === artist &&
        dataArtTrendArtist[i].art_trend_id === artTrend
      ) {
        setArtTrendArtistUpload(false);
        return;
      }
    }
    setArtTrendArtistUpload(true);

    for (let i = 0; i < dataArtistTechnique.length; i += 1) {
      if (
        dataArtistTechnique[i].artist_id === artist &&
        dataArtistTechnique[i].technique_id === technique
      ) {
        setArtisteTechniqueUpload(false);
        return;
      }
    }
    setArtisteTechniqueUpload(true);

    try {
      if (type === dataType.length + 1) {
        typeResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/type`,
          formType
        );
      }

      if (technique === dataTechnique.length + 1) {
        techniqueResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/technique`,
          formTechnique
        );
      }

      if (artTrend === dataArtTrend.length + 1) {
        artTrendResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/arttrend`,
          formArtTrend
        );
      }

      if (artist === dataArtist.length + 1) {
        artistResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/artists`,
          formArtist
        );
      }

      if (artTrendArtistUpload) {
        artTrendArtistResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/arttrendartist`,
          formArtTrendArtist
        );
      }

      if (artisteTechniqueUpload) {
        artistTechniqueResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/artisttechnique`,
          formArtistTechnique
        );
      }

      const artworkResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/artworks`,
        formArtwork
      );

      rollbackData = [
        { endpoint: "type", id: typeResponse.data.id },
        { endpoint: "technique", id: techniqueResponse.data.id },
        { endpoint: "arttrend", id: artTrendResponse.data.id },
        { endpoint: "artists", id: artistResponse.data.id },
        { endpoint: "arttrendartist", id: artTrendArtistResponse.data.id },
        { endpoint: "artisttechnique", id: artistTechniqueResponse.data.id },
        { endpoint: "artworks", id: artworkResponse.data.id },
      ];
      <ValidationModal
        textValidationModal="Oeuvre ajoutée"
        isOpenModalValidation={modalValidation}
        setModalValidation={setModalValidation}
        pictureValidationModal={Validation}
      />;
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);

      if (rollbackData.length > 0) {
        const rollbackPromises = rollbackData.map((data) =>
          axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}/${data.id}`
          )
        );

        await Promise.all(rollbackPromises);
      }
      <ValidationModal
        textValidationModal="Une erreur est survenue"
        isOpenModalValidation={modalValidation}
        setModalValidation={setModalValidation}
        pictureValidationModal={Erreur}
      />;
    }
  };

  return (
    <div>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      <AddArtwork
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
        step={step}
        setStep={setStep}
        setModalConfirmation={setModalConfirmation}
      />
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement ajouter cette oeuvre ?"
        isOpenModalConfirmation={modalConfirmation}
        setModalConfirmation={setModalConfirmation}
        setStep={setStep}
        setModalValidation={setModalValidation}
        handleArtworkUpload={handleArtworkUpload}
      />
    </div>
  );
}

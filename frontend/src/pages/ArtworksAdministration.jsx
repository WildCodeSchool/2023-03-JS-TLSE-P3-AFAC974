import React, { useState } from "react";
// import axios from "axios";
import AddArtwork from "../components/AddArtwork";
import ValidationModal from "../components/ValidationModal";
import ConfirmationModal from "../components/ConfirmationModal";
// import Validation from "../assets/Validation.png";
// import Erreur from "../assets/Erreur.png";
// import { DataProjectContext } from "../context/DataProjectContext";
// import { AddArtworkContext } from "../context/AddArtworkContext";

export default function ArtworksAdministration() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalValidation, setModalValidation] = useState(false);
  const [step, setStep] = useState(1);

  const openModal = () => {
    setModalOpen(true);
  };

  // const {
  //   dataArtist,
  //   dataType,
  //   dataTechnique,
  //   dataArtTrend,
  //   dataArtistTechnique,
  //   dataArtTrendArtist,
  // } = useContext(DataProjectContext);

  // const {
  //   artist,
  //   type,
  //   artTrend,
  //   technique,
  //   formArtwork,
  //   formArtist,
  //   formType,
  //   formTechnique,
  //   formArtTrend,
  // } = useContext(AddArtworkContext);

  // const [artisteTechnique, setArtisteTechnique] = useState(false);
  // const [artTrendArtist, setArtTrendArtist] = useState(false);
  // const [typeUpload, setTypeUpload] = useState(false);
  // const [techniqueUpload, setTechniqueUpload] = useState(false);
  // const [artTrendUpload, setArtTrendUpload] = useState(false);

  // const handleArtworkUpload = async (formArtwork) => {
  //   if (artTrend === dataArtTrend.length + 1) {
  //     setArtTrendUpload(true);
  //   }
  //   if (type === dataType.length + 1) {
  //     setTypeUpload(true);
  //   }
  //   if (technique === dataTechnique.length + 1) {
  //     setTechniqueUpload(true);
  //   }
  //   if (
  //     dataArtTrendArtist.artist_id === artist &&
  //     dataArtTrendArtist.art_trend_id === artTrend
  //   ) {
  //     setArtTrendArtist(false);
  //   } else {
  //     setArtTrendArtist(true);
  //   }
  //   axios
  //     .post(`${import.meta.env.VITE_BACKEND_URL}/artwork`, formArtwork)
  //     .then(() => {
  //       setArtworkUpload(true);
  //       <ValidationModal
  //         textValidationModal="Oeuvre ajoutée"
  //         isOpenModalValidation={modalValidation}
  //         setModalValidation={setModalValidation}
  //         pictureValidationModal={Validation}
  //       />;
  //     })
  //     .catch((error) => {
  //       console.error("Erreur lors de l'envoi des données :", error);
  //       <ValidationModal
  //         textValidationModal="Une erreur est survenue"
  //         isOpenModalValidation={modalValidation}
  //         setModalValidation={setModalValidation}
  //         pictureValidationModal={Erreur}
  //       />;
  //     });
  // };

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
        // handleArtworkUpload={handleArtworkUpload}
      />
      <ValidationModal
        textValidationModal="Oeuvre ajoutée"
        isOpenModalValidation={modalValidation}
        setModalValidation={setModalValidation}
      />
    </div>
  );
}

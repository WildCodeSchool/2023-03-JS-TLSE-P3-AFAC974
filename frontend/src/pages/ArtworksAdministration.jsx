import React, { useState } from "react";
import AddArtwork from "../components/AddArtwork";
import ValidationModal from "../components/ValidationModal";
import ConfirmationModal from "../components/ConfirmationModal";
import PrevPage from "../components/PrevPageButton";

export default function ArtworksAdministration() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalValidation, setModalValidation] = useState(false);
  const [step, setStep] = useState(1);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <section>
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
        />
        <ValidationModal
          textValidationModal="Oeuvre ajoutée"
          isOpenModalValidation={modalValidation}
          setModalValidation={setModalValidation}
        />
      </div>
      <PrevPage />
    </section>
  );
}

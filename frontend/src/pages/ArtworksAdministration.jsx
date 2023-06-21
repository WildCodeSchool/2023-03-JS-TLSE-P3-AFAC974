import React, { useState } from "react";
import AddArtwork from "../components/AddArtwork";
import ValidationModal from "../components/ValidationModal";
import ConfirmationModal from "../components/ConfirmationModal";

export default function ArtworksAdministration() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalValidation, setModalValidation] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [step, setStep] = useState(1);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setStep(1);
  };

  const closeModalValidation = () => {
    setModalValidation(false);
  };

  const closeModalConfirmation = () => {
    setModalConfirmation(false);
  };

  return (
    <div>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      <AddArtwork
        isOpen={modalOpen}
        onClose={closeModal}
        step={step}
        setStep={setStep}
        setModalConfirmation={setModalConfirmation}
      />
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement ajouter cette oeuvre ?"
        isOpenModalConfirmation={modalConfirmation}
        onCloseModalConfirmation={closeModalConfirmation}
        setStep={setStep}
        setModalValidation={setModalValidation}
      />
      <ValidationModal
        textValidationModal="Oeuvre ajoutée"
        isOpenModalValidation={modalValidation}
        onCloseModalValidation={closeModalValidation}
      />
    </div>
  );
}

import React, { useState } from "react";
import AddArtwork from "../components/AddArtwork";

export default function ArtworksAdministration() {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setStep(1);
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
      />
    </div>
  );
}

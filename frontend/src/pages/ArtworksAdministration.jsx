import React, { useState } from "react";
import AddArtwork from "../components/AddArtwork";

export default function ArtworksAdministration() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      <AddArtwork isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
}

import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import RedButton from "./RedButton";
import GreyButton from "./GreyButton";
import Input from "./Input";

function AddArtwork({ isOpen, onClose }) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      border: "none",
      borderRadius: "4px",
      padding: "20px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      maxHeight: "80vh",
      overflow: "auto",
      background: "#fff",
    },
  };

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleCancel = () => {
    setStep(1);
    onClose();
  };

  const handleSubmit = () => {
    setStep(1);
    onClose();
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Input type="file" text="Saisir l'image de l'oeuvre'" />
            <h3>Ajouter une image de l'oeuvre</h3>
            <div>
              <GreyButton text="Annuler" handleCancel={handleCancel} />
              <RedButton text="Suivant" nextStep={nextStep} />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <h2>Informations de l'oeuvre</h2>
            </div>
            <div>
              <div>
                <div>
                  <h3>Nom de l'oeuvre</h3>
                  <Input type="text" text="Saisir le nom de l'oeuvre" />
                </div>
                <div>
                  <h3>Nom de l'artiste</h3>
                  <Input type="text" text="Saisir un nom d'artiste" />
                </div>
                <div>
                  <h3>Année de création</h3>
                  <Input type="text" text="Année de création" />
                </div>
              </div>
              <div>
                <h3>Description</h3>
                <Input type="text" text="Description" />
              </div>
              <div>
                <h3>Dimensions (en cm)</h3>
                <div>
                  <div>
                    <h4>L</h4>
                    <Input type="text" text="Longueur" />
                  </div>
                  <div>
                    <h4>l</h4>
                    <Input type="text" text="Largeur" />
                  </div>
                  <div>
                    <h4>h</h4>
                    <Input type="text" text="Hauteur" />
                  </div>
                </div>
              </div>
              <div>
                <h3>Type d'oeuvre</h3>
                <Input type="text" text="Type d'oeuvre" />
              </div>
              <div>
                <h3>Courant artistique</h3>
                <Input type="text" text="Courant artistique" />
              </div>
            </div>
            <div>
              <h3>Technique</h3>
              <Input type="text" text="Technique" />
            </div>
            <div>
              <GreyButton text="Précédent" prevStep={prevStep} />
              <RedButton text="Suivant" nextStep={nextStep} />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <h2>Information relative à l'artiste</h2>
            </div>
            <div>
              <div>
                <div>
                  <h3>Nom de l'artiste</h3>
                  <Input type="text" text="Nom" />
                </div>
                <div>
                  <h3>Prénom de l'artiste</h3>
                  <Input type="text" text="Prénom" />
                </div>
                <div>
                  <h3>Nom d'usage</h3>
                  <Input type="text" text="Nom d'usage" />
                </div>
              </div>
              <div>
                <h3>Description</h3>
                <Input type="text" text="Description" />
              </div>
              <div>
                <div>
                  <h3>Techniques</h3>
                  <Input type="text" text="Technique" />
                </div>
                <div>
                  <h3>Courant artistique</h3>
                  <Input type="text" text="Courant artistique" />
                </div>
                <div>
                  <h3>Lien site internet</h3>
                  <Input type="url" text="Lien site internet" />
                </div>
              </div>
              <div>
                <div>
                  <h3>Lien Facebook</h3>
                  <Input type="url" text="Facebook" />
                </div>
                <div>
                  <h3>Lien Twitter</h3>
                  <Input type="url" text="Twitter" />
                </div>
                <div>
                  <h3>Lien Instagram</h3>
                  <Input type="url" text="Instagram" />
                </div>
              </div>
            </div>
            <div>
              <GreyButton text="Précédent" prevStep={prevStep} />
              <RedButton text="Suivant" nextStep={nextStep} />
            </div>
          </>
        );
      case 4:
        return (
          <>
            <Input type="file" text="Saisir la photo de l'artiste'" />
            <h3>Ajouter une photo de l'artiste</h3>
            <div>
              <GreyButton text="Précédent" prevStep={prevStep} />
              <RedButton text="Valider" handleSubmit={handleSubmit} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customModalStyles}
      ariaHideApp={false}
    >
      {renderContent()}
    </ReactModal>
  );
}

AddArtwork.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddArtwork;

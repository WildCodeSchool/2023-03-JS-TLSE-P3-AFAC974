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
          <form>
            <label htmlFor="artwork_picture">
              <Input
                type="file"
                text="Saisir l'image de l'oeuvre'"
                id="artwork_picture"
              />
              <h3>Ajouter une image de l'oeuvre</h3>
            </label>
            <div>
              <GreyButton text="Annuler" handleCancel={handleCancel} />
              <RedButton text="Suivant" nextStep={nextStep} />
            </div>
          </form>
        );
      case 2:
        return (
          <form>
            <div>
              <h2>Informations de l'oeuvre</h2>
            </div>
            <div>
              <div>
                <label htmlFor="artwork_name">
                  <h3>Nom de l'oeuvre</h3>
                  <Input
                    type="text"
                    text="Saisir le nom de l'oeuvre"
                    id="artwork_name"
                  />
                </label>
                <label htmlFor="artist_name_artwork">
                  <h3>Nom de l'artiste</h3>
                  <Input
                    type="text"
                    text="Saisir un nom d'artiste"
                    id="atist_name_artwork"
                  />
                </label>
                <label htmlFor="creation">
                  <h3>Année de création</h3>
                  <Input type="text" text="Année de création" id="creation" />
                </label>
              </div>
              <label htmlFor="artwork_description">
                <h3>Description</h3>
                <Input
                  type="text"
                  text="Description"
                  id="artwork_description"
                />
              </label>
              <div>
                <h3>Dimensions (en cm)</h3>
                <div>
                  <label htmlFor="length_artwork">
                    <h4>L</h4>
                    <Input type="text" text="Longueur" id="length_artwork" />
                  </label>
                  <label htmlFor="width">
                    <h4>l</h4>
                    <Input type="text" text="Largeur" id="width_artwork" />
                  </label>
                  <label htmlFor="height_artwork">
                    <h4>h</h4>
                    <Input type="text" text="Hauteur" id="height_artwork" />
                  </label>
                </div>
              </div>
              <label htmlFor="type_artwork">
                <h3>Type d'oeuvre</h3>
                <Input type="text" text="Type d'oeuvre" id="type_artwork" />
              </label>
              <label htmlFor="art_trend_artwork">
                <h3>Courant artistique</h3>
                <Input
                  type="text"
                  text="Courant artistique"
                  id="art_trend_artwork"
                />
              </label>
            </div>
            <label htmlFor="artwork_technical">
              <h3>Technique</h3>
              <Input type="text" text="Technique" id="artwork_technical" />
            </label>
            <div>
              <GreyButton text="Précédent" prevStep={prevStep} />
              <RedButton text="Suivant" nextStep={nextStep} />
            </div>
          </form>
        );
      case 3:
        return (
          <form>
            <div>
              <h2>Information relative à l'artiste</h2>
            </div>
            <div>
              <div>
                <label htmlFor="lastname_artist">
                  <h3>Nom de l'artiste</h3>
                  <Input type="text" text="Nom" id="lastname_artist" />
                </label>
                <label htmlFor="firstname_artist">
                  <h3>Prénom de l'artiste</h3>
                  <Input type="text" text="Prénom" id="firstname_artist" />
                </label>
                <label htmlFor="usual_name">
                  <h3>Nom d'usage</h3>
                  <Input type="text" text="Nom d'usage" id="usual_name" />
                </label>
              </div>
              <label htmlFor="artist_decription">
                <h3>Description</h3>
                <Input type="text" text="Description" id="artist_description" />
              </label>
              <div>
                <label htmlFor="artist_technical">
                  <h3>Techniques</h3>
                  <Input type="text" text="Technique" id="rtist_technical" />
                </label>
                <label htmlFor="art_trend_artist">
                  <h3>Courant artistique</h3>
                  <Input
                    type="text"
                    text="Courant artistique"
                    id="art_trend_artist"
                  />
                </label>
                <label htmlFor="web_site">
                  <h3>Lien site internet</h3>
                  <Input type="url" text="Lien site internet" id="web_site" />
                </label>
              </div>
              <div>
                <label htmlFor="facebook">
                  <h3>Lien Facebook</h3>
                  <Input type="url" text="Facebook" id="facebook" />
                </label>
                <label htmlFor="twitter">
                  <h3>Lien Twitter</h3>
                  <Input type="url" text="Twitter" id="twitter" />
                </label>
                <label htmlFor="instagram">
                  <h3>Lien Instagram</h3>
                  <Input type="url" text="Instagram" id="instagram" />
                </label>
              </div>
            </div>
            <div>
              <GreyButton text="Précédent" prevStep={prevStep} />
              <RedButton text="Suivant" nextStep={nextStep} />
            </div>
          </form>
        );
      case 4:
        return (
          <form>
            <label htmlFor="artist_picture">
              <Input type="file" text="Saisir la photo de l'artiste'" />
              <h3>Ajouter une photo de l'artiste</h3>
            </label>
            <div>
              <GreyButton text="Précédent" prevStep={prevStep} />
              <RedButton text="Valider" handleSubmit={handleSubmit} />
            </div>
          </form>
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

import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import RedButton from "./RedButton";
import GreyButton from "./GreyButton";
import Input from "./Input";

function AddArtwork({ isOpen, onClose, step, setStep, setModalConfirmation }) {
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
    setModalConfirmation(true);
  };

  const [formData, setFormData] = useState("");

  const handleInputChange = (e) => {
    setFormData(e.target.value);
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
              <GreyButton text="Annuler" onClick={handleCancel} />
              <RedButton text="Suivant" onClick={nextStep} />
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
                    id="artwork_name"
                    name="artworkName"
                    placeholder="Saisir le nom de l'oeuvre"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
                <label htmlFor="artist_name_artwork">
                  <h3>Nom de l'artiste</h3>
                  <Input
                    type="text"
                    id="artist_name_artwork"
                    name="artistName"
                    placeholder="Saisir un nom d'artiste"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
                <label htmlFor="creation">
                  <h3>Année de création</h3>
                  <Input
                    type="text"
                    id="creationYear"
                    name="creationYear"
                    placeholder="Année de création"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
              </div>
              <label htmlFor="artwork_description">
                <h3>Description</h3>
                <Input
                  type="text"
                  id="artwork_description"
                  name="artworkDescription"
                  placeholder="Description"
                  onChange={handleInputChange}
                  value={formData}
                />
              </label>
              <div>
                <h3>Dimensions (en cm)</h3>
                <div>
                  <label htmlFor="length_artwork">
                    <h4>L</h4>
                    <Input
                      type="text"
                      id="length_artwork"
                      name="lengthArtwork"
                      placeholder="Longueur"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </label>
                  <label htmlFor="width">
                    <h4>l</h4>
                    <Input
                      type="text"
                      id="width_artwork"
                      name="widthArtwork"
                      placeholder="Largeur"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </label>
                  <label htmlFor="height_artwork">
                    <h4>h</h4>
                    <Input
                      type="text"
                      id="height_artwork"
                      name="heightArtwork"
                      placeholder="Hauteur"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </label>
                </div>
              </div>
              <label htmlFor="type_artwork">
                <h3>Type d'oeuvre</h3>
                <Input
                  type="text"
                  id="type_artwork"
                  name="typeArtwork"
                  placeholder="Type d'oeuvre"
                  onChange={handleInputChange}
                  value={formData}
                />
              </label>
              <label htmlFor="art_trend_artwork">
                <h3>Courant artistique</h3>
                <Input
                  type="text"
                  id="art_trend_artwork"
                  name="artTrendArtwork"
                  placeholder="Courant artistique"
                  onChange={handleInputChange}
                  value={formData}
                />
              </label>
            </div>
            <label htmlFor="artwork_technical">
              <h3>Technique</h3>
              <Input
                type="text"
                id="artwork_technical"
                name="artworkTechnical"
                placeholder="Technique"
                onChange={handleInputChange}
                value={formData}
              />
            </label>
            <div>
              <GreyButton text="Précédent" onClick={prevStep} />
              <RedButton type="submit" text="Suivant" onClick={nextStep} />
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
                  <Input
                    type="text"
                    id="lastname_artist"
                    name="lastnameArtist"
                    placeholder="Nom"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
                <label htmlFor="firstname_artist">
                  <h3>Prénom de l'artiste</h3>
                  <Input
                    type="text"
                    id="firstname_artist"
                    name="firstnameArtist"
                    placeholder="Prénom"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
                <label htmlFor="usual_name">
                  <h3>Nom d'usage</h3>
                  <Input
                    type="text"
                    id="usual_name"
                    name="usualName"
                    placeholder="Nom d'usage"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
              </div>
              <label htmlFor="artist_decription">
                <h3>Description</h3>
                <Input
                  type="text"
                  id="artist_description"
                  name="artistDescription"
                  placeholder="Description"
                  onChange={handleInputChange}
                  value={formData}
                />
              </label>
              <div>
                <label htmlFor="artist_technical">
                  <h3>Techniques</h3>
                  <Input
                    type="text"
                    id="artist_technical"
                    name="artistTechnical"
                    placeholder="Technique"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
                <label htmlFor="art_trend_artist">
                  <h3>Courant artistique</h3>
                  <Input
                    type="text"
                    id="art_trend_artist"
                    name="artTrendArtist"
                    placeholder="Courant artistique"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
                <label htmlFor="web_site">
                  <h3>Lien site internet</h3>
                  <Input
                    type="url"
                    id="web_site"
                    name="webSite"
                    placeholder="Lien site internet"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="facebook">
                  <h3>Lien Facebook</h3>
                  <Input
                    type="url"
                    id="facebook"
                    name="facebook"
                    placeholder="Facebook"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
                <label htmlFor="twitter">
                  <h3>Lien Twitter</h3>
                  <Input
                    type="url"
                    id="twitter"
                    name="twitter"
                    placeholder="Twitter"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
                <label htmlFor="instagram">
                  <h3>Lien Instagram</h3>
                  <Input
                    type="url"
                    id="instagram"
                    name="instagram"
                    placeholder="Instagram"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </label>
              </div>
            </div>
            <div>
              <GreyButton text="Précédent" onClick={prevStep} />
              <RedButton text="Suivant" onClick={nextStep} />
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
              <GreyButton text="Précédent" onClick={prevStep} />
              <RedButton text="Valider" onClick={handleSubmit} />
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customModalStyles}
        ariaHideApp={false}
      >
        {renderContent()}
      </ReactModal>
    </div>
  );
}

AddArtwork.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  step: PropTypes.number,
  setStep: PropTypes.func,
  setModalConfirmation: PropTypes.func,
};

AddArtwork.defaultProps = {
  isOpen: false,
  step: 1,
  setStep: () => {},
  setModalConfirmation: () => {},
};

export default AddArtwork;

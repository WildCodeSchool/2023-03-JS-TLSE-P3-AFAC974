import React, { useState, useRef, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import RedButton from "./RedButton";
import GreyButton from "./GreyButton";
import Input from "./Input";
import ChoosePicture from "../assets/ChoosePicture.png";

function AddArtwork({ isOpen, onClose, step, setStep, setModalConfirmation }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getModalWidth = () => {
    if (windowWidth < 1024) {
      return "fit-content";
    }
    return "70vw";
  };

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      border: "none",
      borderRadius: "20px",
      padding: "20px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: getModalWidth(),
      height: "fit-content",
      maxWidth: "90vw",
      minHeight: "35vh",
      maxHeight: "80vh",
      overflow: "auto",
      background: "#fff",
      display: "flex",
    },
  };
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
          <form className="w-full flex flex-col justify-around py-[20px] px-[50px]">
            <div className="flex justify-center items-center w-full">
              <div className="hidden w-full">
                <Input
                  type="file"
                  text="Saisir l'image de l'oeuvre'"
                  id="artwork_picture"
                />
              </div>
              <label
                htmlFor="artwork_picture"
                className="flex justify-center w-full items-center py-[10vh] lg:h-[50vh] "
              >
                <img src={ChoosePicture} alt="choose" className="w-[8vh]" />
              </label>
            </div>
            <div className="items-bottom">
              <h3 className="text-center w-full">
                Ajouter une image de l'oeuvre
              </h3>
              <div className="flex justify-between py-4 w-full">
                <div className="px-[10px] w-[100%] h-[30px]">
                  <GreyButton text="Annuler" onClick={handleCancel} />
                </div>
                <div className="px-[10px] w-[100%] h-[30px]">
                  <RedButton text="Suivant" onClick={nextStep} />
                </div>
              </div>
            </div>
          </form>
        );
      case 2:
        return (
          <form ref={modalRef} className="flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-[20px]">
                Informations de l'oeuvre
              </h2>
            </div>
            <div className="text-[16px] lg:flex flex-col lg:justify-between">
              <div className="lg:flex lg:justify-center lg:gap-4">
                <label htmlFor="artwork_name" className="w-[100%]">
                  <h3 className="py-4">Nom de l'oeuvre</h3>
                  <div>
                    <Input
                      type="text"
                      id="artwork_name"
                      name="artworkName"
                      placeholder="Saisir le nom de l'oeuvre"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
                <label htmlFor="artist_name_artwork" className="w-[100%]">
                  <h3 className="py-4">Nom de l'artiste</h3>
                  <div>
                    <Input
                      type="text"
                      id="artist_name_artwork"
                      name="artistName"
                      placeholder="Saisir un nom d'artiste"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
                <label htmlFor="creationYear" className="w-[100%]">
                  <h3 className="py-4">Année de création</h3>
                  <div>
                    <Input
                      type="text"
                      id="creationYear"
                      name="creationYear"
                      placeholder="Année de création"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
              </div>
              <label
                htmlFor="artwork_description"
                className="w-[100%] lg:w-[70%] lg:justify-start"
              >
                <h3 className="py-4">Description</h3>
                <div>
                  <Input
                    type="text"
                    id="artwork_description"
                    name="artworkDescription"
                    placeholder="Description"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </div>
              </label>
              <div className="lg:flex lg:justify-between lg:gap-4">
                <div className="lg:flex lg:justify-center">
                  <div className="lg:flex flex-col lg:justify-center">
                    <h3 className="py-4">Dimensions (en cm)</h3>
                    <div className="flex justify-between">
                      <label
                        htmlFor="length_artwork"
                        className="flex justify-between items-center w-[100%]"
                      >
                        <h4 className="w-content p-2">L</h4>
                        <div>
                          <Input
                            type="text"
                            id="length_artwork"
                            name="lengthArtwork"
                            placeholder=""
                            onChange={handleInputChange}
                            value={formData}
                          />
                        </div>
                      </label>
                      <label
                        htmlFor="width"
                        className="flex justify-between items-center w-[100%]"
                      >
                        <h4 className="w-content p-2">l</h4>
                        <div>
                          <Input
                            type="text"
                            id="width_artwork"
                            name="widthArtwork"
                            placeholder=""
                            onChange={handleInputChange}
                            value={formData}
                          />
                        </div>
                      </label>
                      <label
                        htmlFor="height_artwork"
                        className="flex justify-between items-center w-[100%]"
                      >
                        <h4 className="w-content p-2">h</h4>
                        <div>
                          <Input
                            type="text"
                            id="height_artwork"
                            name="heightArtwork"
                            placeholder=""
                            onChange={handleInputChange}
                            value={formData}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <label htmlFor="type_artwork" className="w-[100%]">
                  <h3 className="py-4">Type d'oeuvre</h3>
                  <div>
                    <Input
                      type="text"
                      id="type_artwork"
                      name="typeArtwork"
                      placeholder="Type d'oeuvre"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
                <label htmlFor="art_trend_artwork" className="w-[100%]">
                  <h3 className="py-4">Courant artistique</h3>
                  <div>
                    <Input
                      type="text"
                      id="art_trend_artwork"
                      name="artTrendArtwork"
                      placeholder="Courant artistique"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="w-full lg:flex lg:justify-center">
              <label htmlFor="artwork_technical" className="w-[100%] lg:w-auto">
                <h3 className="py-4">Technique</h3>
                <div>
                  <Input
                    type="text"
                    id="artwork_technical"
                    name="artworkTechnical"
                    placeholder="Technique"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </div>
              </label>
            </div>
            <div className="flex justify-between py-4 lg:justify-around">
              <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
                <GreyButton text="Précédent" onClick={prevStep} />
              </div>
              <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
                <RedButton type="submit" text="Suivant" onClick={nextStep} />
              </div>
            </div>
          </form>
        );
      case 3:
        return (
          <form ref={modalRef} className="flex flex-col justify-between">
            <div>
              <h2 className="font-semibold text-[20px]">
                Information relative à l'artiste
              </h2>
            </div>
            <div className="text-[16px] lg:flex flex-col lg:justify-between">
              <div className="lg:flex lg:justify-between lg:gap-4">
                <label htmlFor="lastname_artist" className="w-[100%]">
                  <h3 className="py-4">Nom de l'artiste</h3>
                  <div>
                    <Input
                      type="text"
                      id="lastname_artist"
                      name="lastnameArtist"
                      placeholder="Nom"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
                <label htmlFor="firstname_artist" className="w-[100%]">
                  <h3 className="py-4">Prénom de l'artiste</h3>
                  <div>
                    <Input
                      type="text"
                      id="firstname_artist"
                      name="firstnameArtist"
                      placeholder="Prénom"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
                <label htmlFor="usual_name" className="w-[100%]">
                  <h3 className="py-4">Nom d'usage</h3>
                  <div>
                    <Input
                      type="text"
                      id="usual_name"
                      name="usualName"
                      placeholder="Nom d'usage"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
              </div>
              <label htmlFor="artist_decription" className="w-[100%]">
                <h3 className="py-4">Description</h3>
                <div>
                  <Input
                    type="text"
                    id="artist_description"
                    name="artistDescription"
                    placeholder="Description"
                    onChange={handleInputChange}
                    value={formData}
                  />
                </div>
              </label>
              <div className="lg:flex lg:justify-between lg:gap-4">
                <label htmlFor="artist_technical" className="w-[100%]">
                  <h3 className="py-4">Techniques</h3>
                  <div>
                    <Input
                      type="text"
                      id="artist_technical"
                      name="artistTechnical"
                      placeholder="Technique"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
                <label htmlFor="art_trend_artist" className="w-[100%]">
                  <h3 className="py-4">Courant artistique</h3>
                  <div>
                    <Input
                      type="text"
                      id="art_trend_artist"
                      name="artTrendArtist"
                      placeholder="Courant artistique"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
                <label htmlFor="web_site" className="w-[100%]">
                  <h3 className="py-4">Lien site internet</h3>
                  <div>
                    <Input
                      type="url"
                      id="web_site"
                      name="webSite"
                      placeholder="Lien site internet"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
              </div>
              <div className="lg:flex lg:justify-between lg:gap-4">
                <label htmlFor="facebook" className="w-[100%]">
                  <h3 className="py-4">Lien Facebook</h3>
                  <div>
                    <Input
                      type="url"
                      id="facebook"
                      name="facebook"
                      placeholder="Facebook"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
                <label htmlFor="twitter" className="w-[100%]">
                  <h3 className="py-4">Lien Twitter</h3>
                  <div>
                    <Input
                      type="url"
                      id="twitter"
                      name="twitter"
                      placeholder="Twitter"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
                <label htmlFor="instagram" className="w-[100%]">
                  <h3 className="py-4">Lien Instagram</h3>
                  <div>
                    <Input
                      type="url"
                      id="instagram"
                      name="instagram"
                      placeholder="Instagram"
                      onChange={handleInputChange}
                      value={formData}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="flex justify-between py-4 lg:justify-around">
              <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
                <GreyButton text="Précédent" onClick={prevStep} />
              </div>
              <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
                <RedButton text="Suivant" onClick={nextStep} />
              </div>
            </div>
          </form>
        );
      case 4:
        return (
          <form className="w-full flex flex-col justify-between py-[20px]  px-[50px]">
            <div className="flex justify-center items-center w-full">
              <div className="hidden w-full">
                <Input
                  type="file"
                  text="Saisir la photo de l'artiste"
                  id="artist_picture"
                />
              </div>
              <label
                htmlFor="artist_picture"
                className="flex justify-center w-full items-center py-[10vh] lg:h-[40vh] "
              >
                <img src={ChoosePicture} alt="choose" className="w-[8vh]" />
              </label>
            </div>
            <div>
              <h3 className="text-center w-full item">
                Ajouter une photo de l'artiste
              </h3>
              <div className="flex justify-between py-4 w-full">
                <div className="px-[10px] w-[100%] h-[30px]">
                  <GreyButton text="Précédent" onClick={prevStep} />
                </div>
                <div className="px-[10px] w-[100%] h-[30px] text-[16px]">
                  <RedButton text="Valider" onClick={handleSubmit} />
                </div>
              </div>
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

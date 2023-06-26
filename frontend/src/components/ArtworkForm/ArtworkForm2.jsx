import React from "react";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";

function ArtworkForm2({
  formData,
  handleInputChange,
  modalRef,
  prevStep,
  nextStep,
}) {
  return (
    <div ref={modalRef} className="h-full flex flex-col justify-between">
      <div>
        <h2 className="font-semibold text-[16px]">Informations de l'oeuvre</h2>
      </div>
      <div className="text-[16px] lg:flex flex-col lg:justify-between">
        <div className="lg:flex lg:justify-center lg:gap-4">
          <label htmlFor="artwork_name" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom de l'oeuvre</h3>
            <div>
              <Input
                type="text"
                id="artwork_name"
                name="artworkName"
                placeholder="Saisir le nom de l'oeuvre"
                onChange={handleInputChange}
                value={formData.artworkName}
              />
            </div>
          </label>
          <label htmlFor="artist_name_artwork" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom de l'artiste</h3>
            <div>
              <Input
                type="text"
                id="artist_name_artwork"
                name="artistName"
                placeholder="Saisir un nom d'artiste"
                onChange={handleInputChange}
                value={formData.artistName}
              />
            </div>
          </label>
          <label htmlFor="creationYear" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Année de création</h3>
            <div>
              <Input
                type="text"
                id="creationYear"
                name="creationYear"
                placeholder="Année de création"
                onChange={handleInputChange}
                value={formData.creationYear}
              />
            </div>
          </label>
        </div>
        <label
          htmlFor="artwork_description"
          className="w-[100%] lg:w-[70%] lg:justify-start"
        >
          <h3 className="py-4 text-[14px]">Description</h3>
          <div>
            <textarea
              id="artwork_description"
              name="artworkDescription"
              placeholder="Description"
              onChange={handleInputChange}
              value={formData.artworkDescription}
              className="border border-gray-300 rounded-[4px] p-1 w-[100%] resize-none outline-none overflow-x-hidden"
            />
          </div>
        </label>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <div className="lg:flex lg:justify-center w-[100%]">
            <div className="lg:flex flex-col lg:justify-center">
              <h3 className="py-4  w-[100%] text-[14px]">Dimensions (en cm)</h3>
              <div className="flex justify-between gap-4">
                <label
                  htmlFor="length_artwork"
                  className="flex justify-between items-center w-[100%] gap-4"
                >
                  <h4 className="w-content text-[14px]">L</h4>
                  <div>
                    <Input
                      type="text"
                      id="length_artwork"
                      name="lengthArtwork"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.lengthArtwork}
                    />
                  </div>
                </label>
                <label
                  htmlFor="width"
                  className="flex justify-between items-center w-[100%] gap-4"
                >
                  <h4 className="w-content text-[14px]">l</h4>
                  <div>
                    <Input
                      type="text"
                      id="width_artwork"
                      name="widthArtwork"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.widthArtwork}
                    />
                  </div>
                </label>
                <label
                  htmlFor="height_artwork"
                  className="flex justify-between items-center w-[100%] gap-4"
                >
                  <h4 className="w-content text-[14px]">h</h4>
                  <div>
                    <Input
                      type="text"
                      id="height_artwork"
                      name="heightArtwork"
                      placeholder=""
                      onChange={handleInputChange}
                      value={formData.heightArtwork}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <label htmlFor="type_artwork" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Type d'oeuvre</h3>
            <div>
              <Input
                type="text"
                id="type_artwork"
                name="typeArtwork"
                placeholder="Type d'oeuvre"
                onChange={handleInputChange}
                value={formData.typeArtwork}
              />
            </div>
          </label>
          <label htmlFor="art_trend_artwork" className="w-[100%]">
            <h3 className="py-4 flex-nowrap text-[14px]">Courant artistique</h3>
            <div>
              <Input
                type="text"
                id="art_trend_artwork"
                name="artTrendArtwork"
                placeholder="Courant artistique"
                onChange={handleInputChange}
                value={formData.artTrendArtwork}
              />
            </div>
          </label>
        </div>
      </div>
      <div className="w-full lg:flex lg:justify-center">
        <label htmlFor="artwork_technical" className="w-[100%] lg:w-auto">
          <h3 className="py-4 text-[14px]">Technique</h3>
          <div>
            <Input
              type="text"
              id="artwork_technical"
              name="artworkTechnical"
              placeholder="Technique"
              onChange={handleInputChange}
              value={formData.artworkTechnical}
            />
          </div>
        </label>
      </div>
      <div className="flex justify-between py-4 lg:justify-around">
        <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
          <GreyButton text="Précédent" onClick={prevStep} />
        </div>
        <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%] ">
          <RedButton type="submit" text="Suivant" onClick={nextStep} />
        </div>
      </div>
    </div>
  );
}

ArtworkForm2.propTypes = {
  formData: PropTypes.shape({
    artworkName: PropTypes.string,
    artistName: PropTypes.string,
    creationYear: PropTypes.string,
    artworkDescription: PropTypes.string,
    lengthArtwork: PropTypes.string,
    widthArtwork: PropTypes.string,
    heightArtwork: PropTypes.string,
    typeArtwork: PropTypes.string,
    artTrendArtwork: PropTypes.string,
    artworkTechnical: PropTypes.string,
    lastnameArtist: PropTypes.string,
    firstnameArtist: PropTypes.string,
    usualName: PropTypes.string,
    artistDescription: PropTypes.string,
    artistTechnical: PropTypes.string,
    artTrendArtist: PropTypes.string,
    webSite: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    instagram: PropTypes.string,
  }),
  handleInputChange: PropTypes.func,
  modalRef: PropTypes.shape(),
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
};

ArtworkForm2.defaultProps = {
  formData: {
    artworkName: "",
    artistName: "",
    creationYear: "",
    artworkDescription: "",
    lengthArtwork: "",
    widthArtwork: "",
    heightArtwork: "",
    typeArtwork: "",
    artTrendArtwork: "",
    artworkTechnical: "",
    lastnameArtist: "",
    firstnameArtist: "",
    usualName: "",
    artistDescription: "",
    artistTechnical: "",
    artTrendArtist: "",
    webSite: "",
    facebook: "",
    twitter: "",
    instagram: "",
  },
  handleInputChange: () => {},
  modalRef: {},
  prevStep: () => {},
  nextStep: () => {},
};

export default ArtworkForm2;

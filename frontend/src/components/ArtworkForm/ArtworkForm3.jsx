import React from "react";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";

function ArtworkForm3({
  formData,
  handleInputChange,
  modalRef,
  prevStep,
  nextStep,
}) {
  return (
    <div ref={modalRef} className="h-full flex flex-col justify-between">
      <div>
        <h2 className="font-semibold text-[16px]">
          Information relative à l'artiste
        </h2>
      </div>
      <div className="text-[16px] lg:flex flex-col lg:justify-between">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <label htmlFor="lastname_artist" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom de l'artiste</h3>
            <div>
              <Input
                type="text"
                id="lastname_artist"
                name="lastnameArtist"
                placeholder="Nom"
                onChange={handleInputChange}
                value={formData.lastnameArtist}
              />
            </div>
          </label>
          <label htmlFor="firstname_artist" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Prénom de l'artiste</h3>
            <div>
              <Input
                type="text"
                id="firstname_artist"
                name="firstnameArtist"
                placeholder="Prénom"
                onChange={handleInputChange}
                value={formData.firstnameArtist}
              />
            </div>
          </label>
          <label htmlFor="usual_name" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom d'usage</h3>
            <div>
              <Input
                type="text"
                id="usual_name"
                name="usualName"
                placeholder="Nom d'usage"
                onChange={handleInputChange}
                value={formData.usualName}
              />
            </div>
          </label>
        </div>
        <label htmlFor="artist_decription" className="w-[100%]">
          <h3 className="py-4 text-[14px]">Description</h3>
          <div>
            <textarea
              id="artist_description"
              name="artistDescription"
              placeholder="Description"
              onChange={handleInputChange}
              value={formData.artistDescription}
              className="border border-gray-300 rounded-[4px] p-1 w-[100%] resize-none outline-none overflow-x-hidden"
            />
          </div>
        </label>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <label htmlFor="artist_technical" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Techniques</h3>
            <div>
              <Input
                type="text"
                id="artist_technical"
                name="artistTechnical"
                placeholder="Technique"
                onChange={handleInputChange}
                value={formData.artistTechnical}
              />
            </div>
          </label>
          <label htmlFor="art_trend_artist" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Courant artistique</h3>
            <div>
              <Input
                type="text"
                id="art_trend_artist"
                name="artTrendArtist"
                placeholder="Courant artistique"
                onChange={handleInputChange}
                value={formData.artTrendArtist}
              />
            </div>
          </label>
          <label htmlFor="web_site" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Lien site internet</h3>
            <div>
              <Input
                type="url"
                id="web_site"
                name="webSite"
                placeholder="Lien site internet"
                onChange={handleInputChange}
                value={formData.webSite}
              />
            </div>
          </label>
        </div>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <label htmlFor="facebook" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Lien Facebook</h3>
            <div>
              <Input
                type="url"
                id="facebook"
                name="facebook"
                placeholder="Facebook"
                onChange={handleInputChange}
                value={formData.facebook}
              />
            </div>
          </label>
          <label htmlFor="twitter" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Lien Twitter</h3>
            <div>
              <Input
                type="url"
                id="twitter"
                name="twitter"
                placeholder="Twitter"
                onChange={handleInputChange}
                value={formData.twitter}
              />
            </div>
          </label>
          <label htmlFor="instagram" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Lien Instagram</h3>
            <div>
              <Input
                type="url"
                id="instagram"
                name="instagram"
                placeholder="Instagram"
                onChange={handleInputChange}
                value={formData.instagram}
              />
            </div>
          </label>
        </div>
      </div>
      <div className="flex justify-between py-4 lg:justify-around ">
        <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
          <GreyButton text="Précédent" onClick={prevStep} />
        </div>
        <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
          <RedButton text="Suivant" onClick={nextStep} />
        </div>
      </div>
    </div>
  );
}

ArtworkForm3.propTypes = {
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

ArtworkForm3.defaultProps = {
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

export default ArtworkForm3;

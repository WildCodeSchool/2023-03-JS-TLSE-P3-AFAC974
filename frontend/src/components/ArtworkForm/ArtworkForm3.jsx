/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";
import SelectionInput from "../SelectionInput";

function ArtworkForm3({
  formArtist,
  handleInputChangeArtist,
  modalRef,
  prevStep,
  nextStep,
  handleInputChangeArtTrend,
  handleInputChangeTechnique,
  formArtTrend,
  formTechnique,
  isLoadedTechnique,
  isLoadedArtTrend,
  dataTechnique,
  dataArtTrend,
  artTrend,
  setArtTrend,
  technique,
  setTechnique,
}) {
  return (
    <div ref={modalRef} className="h-full flex flex-col justify-between">
      <div>
        <h2 className="font-semibold text-[20px]">
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
                name="lastname"
                placeholder="Nom"
                onChange={handleInputChangeArtist}
                value={formArtist.lastname}
              />
            </div>
          </label>
          <label htmlFor="firstname_artist" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Prénom de l'artiste</h3>
            <div>
              <Input
                type="text"
                id="firstname_artist"
                name="firstname"
                placeholder="Prénom"
                onChange={handleInputChangeArtist}
                value={formArtist.firstname}
              />
            </div>
          </label>
          <label htmlFor="usual_name" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom d'usage</h3>
            <div>
              <Input
                type="text"
                id="usual_name"
                name="nickname"
                placeholder="Nom d'usage"
                onChange={handleInputChangeArtist}
                value={formArtist.nickname}
              />
            </div>
          </label>
        </div>
        <label htmlFor="artist_decription" className="w-[100%]">
          <h3 className="py-4 text-[14px]">Description</h3>
          <div>
            <textarea
              id="artist_description"
              name="description"
              placeholder="Description"
              onChange={handleInputChangeArtist}
              value={formArtist.description}
              className="border border-gray-300 rounded-[4px] p-1 w-[100%] resize-none outline-none overflow-x-hidden"
            />
          </div>
        </label>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <label htmlFor="artist_technical" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Techniques</h3>
            <div>
              <SelectionInput
                handleInputChange={handleInputChangeTechnique}
                idSelection={technique}
                setIdSelection={setTechnique}
                isLoaded={isLoadedTechnique}
                data={dataTechnique}
                name="technique_id"
                id="artwork_technical"
                placeholder="Technique"
                text="Technique"
              />
              {parseInt(technique, 10) === dataTechnique.length + 1 ? (
                <Input
                  type="text"
                  id="artwork_technical"
                  name="name"
                  placeholder="Technique"
                  onChange={handleInputChangeTechnique}
                  value={formTechnique.name}
                />
              ) : null}
            </div>
          </label>
          <label htmlFor="art_trend_artist" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Courant artistique</h3>
            <div>
              <SelectionInput
                handleInputChange={handleInputChangeArtTrend}
                idSelection={artTrend}
                setIdSelection={setArtTrend}
                isLoaded={isLoadedArtTrend}
                data={dataArtTrend}
                name="art_trend_id"
                id="art_trend_artwork"
                text="Courant Artistique"
              />
              {parseInt(artTrend, 10) === dataArtTrend.length + 1 ? (
                <Input
                  type="text"
                  id="art_trend_artwork"
                  name="name"
                  placeholder="Courant artistique"
                  onChange={handleInputChangeArtTrend}
                  value={formArtTrend.name}
                />
              ) : null}
            </div>
          </label>
          <label htmlFor="web_site" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Lien site internet</h3>
            <div>
              <Input
                type="url"
                id="web_site"
                name="website_url"
                placeholder="Lien site internet"
                onChange={handleInputChangeArtist}
                value={formArtist.website_url}
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
                name="facebook_url"
                placeholder="Facebook"
                onChange={handleInputChangeArtist}
                value={formArtist.facebook_url}
              />
            </div>
          </label>
          <label htmlFor="twitter" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Lien Twitter</h3>
            <div>
              <Input
                type="url"
                id="twitter"
                name="twitter_url"
                placeholder="Twitter"
                onChange={handleInputChangeArtist}
                value={formArtist.twitter_url}
              />
            </div>
          </label>
          <label htmlFor="instagram" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Lien Instagram</h3>
            <div>
              <Input
                type="url"
                id="instagram"
                name="instagram_url"
                placeholder="Instagram"
                onChange={handleInputChangeArtist}
                value={formArtist.instagram_url}
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
  formArtist: PropTypes.shape({
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    nickname: PropTypes.string,
    description: PropTypes.string,
    artistTechnical: PropTypes.string,
    artTrendArtist: PropTypes.string,
    website_url: PropTypes.string,
    facebook_url: PropTypes.string,
    instagram_url: PropTypes.string,
    twitter_url: PropTypes.string,
  }),
  handleInputChangeArtist: PropTypes.func,
  modalRef: PropTypes.shape(),
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
};

ArtworkForm3.defaultProps = {
  formArtist: {
    lastname: "",
    firstname: "",
    nickname: "",
    description: "",
    artistTechnical: "",
    artTrendArtist: "",
    website_url: "",
    facebook_url: "",
    instagram_url: "",
    twitter_url: "",
  },
  handleInputChangeArtist: () => {},
  modalRef: {},
  prevStep: () => {},
  nextStep: () => {},
};

export default ArtworkForm3;

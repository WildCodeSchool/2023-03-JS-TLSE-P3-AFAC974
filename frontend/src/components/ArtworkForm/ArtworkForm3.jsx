/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";
import { AddArtworkContext } from "../../context/AddArtworkContext";
import { DataProjectContext } from "../../context/DataProjectContext";

function ArtworkForm3({ modalRef, prevStep, nextStep }) {
  const {
    artTrend,
    technique,
    formArtist,
    formTechnique,
    formArtTrend,
    handleInputChangeArtist,
  } = useContext(AddArtworkContext);
  const { dataTechnique, dataArtTrend } = useContext(DataProjectContext);
  // console.log(formArtwork);
  // console.log(formArtist);
  // console.log(formArtTrend);
  // console.log(formTechnique);
  // console.log(formType);
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
          <div className="w-[10dvw]">
            <h3>Nom d'usage</h3>
            <div className="border-4 border-solid border-gray-500">
              <p className="overflow-hidden">{formArtist.nickname}</p>
            </div>
          </div>
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
          <div className="w-[5dvw]">
            <h3>Techniques</h3>
            <div className="border-4 border-solid border-gray-600 p-3">
              <p className="overflow-hidden text-black">
                {formTechnique.name
                  ? formTechnique.name
                  : dataTechnique[technique - 1].name}
              </p>
            </div>
          </div>
          <div className="w-[5dvw]">
            <h3>Courant Artistique</h3>
            <div className="border-4 border-solid border-gray-600 p-3">
              <p className="overflow-hidden text-black">
                {formArtTrend.name
                  ? formArtTrend.name
                  : dataArtTrend[artTrend - 1].name}
              </p>
            </div>
          </div>
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
  modalRef: {},
  prevStep: () => {},
  nextStep: () => {},
};

export default ArtworkForm3;

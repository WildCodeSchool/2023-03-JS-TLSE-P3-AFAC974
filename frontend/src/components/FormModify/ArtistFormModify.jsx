import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";
import { FormArtworkArtistContext } from "../../context/FormArtworkArtistContext";

function ArtistFormModify({ prevStep, nextStep, selectedArtistId }) {
  const { formArtist, handleInputChangeArtist, needToFetch } = useContext(
    FormArtworkArtistContext
  );

  const [isLoadedTechniqueName, setIsLoadedTechniqueName] = useState(false);
  const [isLoadedArtTrendName, setIsLoadedArtTrendName] = useState(false);
  const [dataArtTrendName, setDataArtTrendName] = useState(false);
  const [dataTechniqueName, setDataTechniqueName] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/artists-techniques/${selectedArtistId}`
      )
      .then((res) => {
        setDataTechniqueName(res.data);
        setIsLoadedTechniqueName(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [selectedArtistId]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/arttrends-artists/${selectedArtistId}`
      )
      .then((res) => {
        setDataArtTrendName(res.data);
        setIsLoadedArtTrendName(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch, selectedArtistId]);

  return (
    <div>
      {isLoadedArtTrendName && isLoadedTechniqueName ? (
        <div className="h-full flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-[20px]">
              Information relative à l'artiste
            </h2>
          </div>
          <div className="text-[16px] lg:flex flex-col lg:justify-between">
            <div className="lg:flex lg:justify-between lg:gap-4">
              <label htmlFor="lastname_artist" className="w-[100%]">
                <h3 className="py-4 text-[14px]">Nom de l'artiste *</h3>
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
                <h3 className="py-4 text-[14px]">Prénom de l'artiste *</h3>
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
              <label htmlFor="nickname_artist" className="w-[100%]">
                <h3 className="py-4 text-[14px]">Nom d'usage *</h3>
                <div>
                  <Input
                    type="text"
                    id="nickname_artist"
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
              <div className="w-[100%]">
                <h3 className="py-4 text-[14px]">Techniques</h3>
                <div>
                  {dataTechniqueName.map((item) => (
                    <p
                      key={item}
                      className="border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%]"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <div className="w-[100%]">
                <h3 className="py-4 text-[14px]">Courant Artistique</h3>
                <div>
                  {dataArtTrendName.map((item) => (
                    <p
                      key={item}
                      className="border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%]"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <label htmlFor="web_site" className="w-[100%]">
                <h3 className="py-4 text-[14px]">Lien site internet</h3>
                <div>
                  <Input
                    type="url"
                    id="web_site"
                    name="websiteUrl"
                    placeholder="Lien site internet"
                    onChange={handleInputChangeArtist}
                    value={formArtist.websiteUrl}
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
                    name="facebookUrl"
                    placeholder="Facebook"
                    onChange={handleInputChangeArtist}
                    value={formArtist.facebookUrl}
                  />
                </div>
              </label>
              <label htmlFor="twitter" className="w-[100%]">
                <h3 className="py-4 text-[14px]">Lien Twitter</h3>
                <div>
                  <Input
                    type="url"
                    id="twitter"
                    name="twitterUrl"
                    placeholder="Twitter"
                    onChange={handleInputChangeArtist}
                    value={formArtist.twitterUrl}
                  />
                </div>
              </label>
              <label htmlFor="instagram" className="w-[100%]">
                <h3 className="py-4 text-[14px]">Lien Instagram</h3>
                <div>
                  <Input
                    type="url"
                    id="instagram"
                    name="instagramUrl"
                    placeholder="Instagram"
                    onChange={handleInputChangeArtist}
                    value={formArtist.instagramUrl}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="flex justify-between py-4 lg:justify-around ">
            <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
              <GreyButton text="Annuler" onClick={prevStep} />
            </div>
            <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
              <RedButton
                text="Valider"
                onClick={nextStep}
                disabled={!formArtist.firstname || !formArtist.lastname}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

ArtistFormModify.propTypes = {
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
  selectedArtistId: PropTypes.number.isRequired,
};

ArtistFormModify.defaultProps = {
  prevStep: () => {},
  nextStep: () => {},
};

export default ArtistFormModify;

import React, { useContext } from "react";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";
import SelectionInput from "../SelectionInput";
import { FormArtworkArtistContext } from "../../context/FormArtworkArtistContext";

function ArtworkForm2({
  modalRef,
  prevStep,
  nextStep,
  isLoadedArtist,
  isLoadedType,
  isLoadedTechnique,
  isLoadedArtTrend,
  dataArtist,
  dataType,
  dataTechnique,
  dataArtTrend,
  handleJointureArtisteArtTrend,
  handleJointureArtisteTechnique,
  jointureVerify,
}) {
  const {
    artist,
    setArtist,
    type,
    setType,
    artTrend,
    setArtTrend,
    technique,
    setTechnique,
    formArtwork,
    formArtist,
    formType,
    formTechnique,
    formArtTrend,
    handleInputChangeArtTrend,
    handleInputChangeArtist,
    handleInputChangeArtwork,
    handleInputChangeTechnique,
    handleInputChangeType,
  } = useContext(FormArtworkArtistContext);

  return (
    <div
      ref={modalRef}
      className="h-full flex flex-col justify-between items-center"
    >
      <div>
        <h2 className="font-semibold text-[20px]">Informations de l'oeuvre</h2>
      </div>
      <div className="text-[16px] lg:flex flex-col lg:justify-between">
        <div className="lg:flex lg:justify-center lg:gap-4">
          <label htmlFor="artwork_name" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom de l'oeuvre *</h3>
            <div>
              <Input
                type="text"
                id="artwork_name"
                name="name"
                placeholder="Saisir le nom de l'oeuvre"
                onChange={handleInputChangeArtwork}
                value={formArtwork.name}
                maxLength={255}
              />
              {255 - formArtwork.name.length <= 50 ? (
                <span
                  className={
                    255 - formArtwork.name.length === 0 ? "text-red-500" : ""
                  }
                >
                  {255 - formArtwork.name.length} caractères restants
                </span>
              ) : null}
            </div>
          </label>
          <label htmlFor="artist_name_artwork" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom de l'artiste *</h3>
            <div>
              <SelectionInput
                handleInputChange={handleInputChangeArtwork}
                handleJointureArtisteArtTrend={handleJointureArtisteArtTrend}
                handleJointureArtisteTechnique={handleJointureArtisteTechnique}
                idSelection={artist}
                setIdSelection={setArtist}
                isLoaded={isLoadedArtist}
                data={dataArtist}
                name="artistId"
                id="artist-select"
                text="Artiste"
                isLoadedId
              />
            </div>
            <div className="mt-3">
              {parseInt(artist, 10) ===
              Math.max(...dataArtist.map((item) => item.id)) + 1 ? (
                <>
                  <Input
                    type="text"
                    id="artist-select"
                    name="nickname"
                    placeholder="Saisir un nom d'artiste"
                    onChange={handleInputChangeArtist}
                    value={formArtist.nickname}
                    maxLength={45}
                  />
                  {45 - formArtist.nickname.length <= 10 ? (
                    <span
                      className={
                        45 - formArtist.nickname.length === 0
                          ? "text-red-500"
                          : ""
                      }
                    >
                      {45 - formArtist.nickname.length} caractères restants
                    </span>
                  ) : null}
                </>
              ) : null}
            </div>
          </label>
          <label htmlFor="creationYear" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Année de création</h3>
            <div>
              <Input
                type="text"
                id="creationYear"
                name="year"
                placeholder="Année de création"
                onChange={handleInputChangeArtwork}
                value={formArtwork.year === 0 ? "" : formArtwork.year}
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
              name="description"
              placeholder="Description"
              onChange={handleInputChangeArtwork}
              value={formArtwork.description}
              className="border border-gray-300 rounded-[4px] p-1 w-[100%] resize-none outline-none overflow-x-hidden"
              maxLength={1000}
            />
            {100 - formArtwork.description.length <= 5 ? (
              <span
                className={
                  1000 - formArtwork.description.length === 0
                    ? "text-red-500"
                    : ""
                }
              >
                {1000 - formArtwork.description.length} caractères restants
              </span>
            ) : null}
          </div>
        </label>
        <div className="lg:flex lg:justify-between lg:gap-4">
          <div className="lg:flex lg:justify-center w-[100%]">
            <div className="lg:flex flex-col lg:justify-center">
              <h3 className="py-4  w-[100%] text-[14px]">Dimensions (en cm)</h3>
              <div className="flex justify-between gap-4">
                <label
                  htmlFor="width_artwork"
                  className="flex justify-between items-center w-[100%] gap-2"
                >
                  <h4 className="w-content text-[14px]">L</h4>
                  <div className="lg:w-[40px] xl:w-[50px]">
                    <Input
                      type="text"
                      id="width_artwork"
                      name="widthCm"
                      placeholder=""
                      onChange={handleInputChangeArtwork}
                      value={
                        formArtwork.widthCm === 0 ? "" : formArtwork.widthCm
                      }
                    />
                  </div>
                </label>
                <label
                  htmlFor="height_artwork"
                  className="flex justify-between items-center w-[100%] gap-2"
                >
                  <h4 className="w-content text-[14px]">h</h4>
                  <div className="lg:w-[40px] xl:w-[50px]">
                    <Input
                      type="text"
                      id="height_artwork"
                      name="heightCm"
                      placeholder=""
                      onChange={handleInputChangeArtwork}
                      value={
                        formArtwork.heightCm === 0 ? "" : formArtwork.heightCm
                      }
                    />
                  </div>
                </label>
                <label
                  htmlFor="depth_artwork"
                  className="flex justify-between items-center w-[100%] gap-2"
                >
                  <h4 className="w-content text-[14px]">P</h4>
                  <div className="lg:w-[40px] xl:w-[50px]">
                    <Input
                      type="text"
                      id="depth_artwork"
                      name="depthCm"
                      placeholder=""
                      onChange={handleInputChangeArtwork}
                      value={
                        formArtwork.depthCm === 0 ? "" : formArtwork.depthCm
                      }
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <label htmlFor="type_artwork" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Type d'oeuvre *</h3>
            <div>
              <SelectionInput
                handleInputChange={handleInputChangeArtwork}
                idSelection={type}
                setIdSelection={setType}
                isLoaded={isLoadedType}
                data={dataType}
                name="typeId"
                id="type_artwork"
                text="Type"
                isLoadedId
              />
            </div>
            <div className="mt-3">
              {parseInt(type, 10) ===
              Math.max(...dataType.map((item) => item.id)) + 1 ? (
                <>
                  <Input
                    type="text"
                    id="type_artwork"
                    name="name"
                    placeholder="Type d'oeuvre"
                    onChange={handleInputChangeType}
                    value={formType.name}
                    maxLength={255}
                  />
                  {255 - formType.name.length <= 50 ? (
                    <span
                      className={
                        255 - formType.name.length === 0 ? "text-red-500" : ""
                      }
                    >
                      {255 - formType.name.length} caractères restants
                    </span>
                  ) : null}
                </>
              ) : null}
            </div>
          </label>
          <label htmlFor="art_trend_artwork" className="w-[100%]">
            <h3 className="py-4 flex-nowrap text-[14px]">
              Courant artistique *
            </h3>
            <div>
              <SelectionInput
                handleInputChange={handleInputChangeArtwork}
                handleJointureArtisteArtTrend={handleJointureArtisteArtTrend}
                idSelection={artTrend}
                setIdSelection={setArtTrend}
                isLoaded={isLoadedArtTrend}
                data={dataArtTrend}
                name="artTrendId"
                id="art_trend_artwork"
                text="Courant Artistique"
                isLoadedId
              />
            </div>
            <div className="mt-3">
              {parseInt(artTrend, 10) ===
              Math.max(...dataArtTrend.map((item) => item.id)) + 1 ? (
                <>
                  <Input
                    type="text"
                    id="art_trend_artwork"
                    name="name"
                    placeholder="Courant artistique"
                    onChange={handleInputChangeArtTrend}
                    value={formArtTrend.name}
                    maxLength={255}
                  />
                  {255 - formArtTrend.name.length <= 50 ? (
                    <span
                      className={
                        255 - formArtTrend.name.length === 0
                          ? "text-red-500"
                          : ""
                      }
                    >
                      {255 - formArtTrend.name.length} caractères restants
                    </span>
                  ) : null}
                </>
              ) : null}
            </div>
          </label>
        </div>
      </div>
      <div className="w-full lg:flex lg:justify-center gap-8">
        <label htmlFor="artwork_technical" className="w-[100%] lg:w-auto">
          <h3 className="py-4 text-[14px]">Technique *</h3>
          <div>
            <SelectionInput
              handleInputChange={handleInputChangeArtwork}
              handleJointureArtisteTechnique={handleJointureArtisteTechnique}
              idSelection={technique}
              setIdSelection={setTechnique}
              isLoaded={isLoadedTechnique}
              data={dataTechnique}
              name="techniqueId"
              id="artwork_technical"
              placeholder="Technique"
              text="Technique"
              isLoadedId
            />
          </div>
          <div className="mt-3">
            {parseInt(technique, 10) ===
            Math.max(...dataTechnique.map((item) => item.id)) + 1 ? (
              <>
                <Input
                  type="text"
                  id="artwork_technical"
                  name="name"
                  placeholder="Technique"
                  onChange={handleInputChangeTechnique}
                  value={formTechnique.name}
                  maxLength={255}
                />
                {255 - formTechnique.name.length <= 50 ? (
                  <span
                    className={
                      255 - formTechnique.name.length === 0
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {255 - formTechnique.name.length} caractères restants
                  </span>
                ) : null}
              </>
            ) : null}
          </div>
        </label>
        <label htmlFor="location_artwork" className="w-[30%]">
          <h3 className="py-4 text-[14px]">Lieu de conservation</h3>
          <div>
            <Input
              type="text"
              id="location_artwork"
              name="artworkLocation"
              placeholder=""
              onChange={handleInputChangeArtwork}
              value={formArtwork.artworkLocation}
              maxLength={255}
            />
            {255 - formArtwork.artworkLocation.length <= 50 ? (
              <span
                className={
                  255 - formArtwork.artworkLocation.length === 0
                    ? "text-red-500"
                    : ""
                }
              >
                {255 - formArtwork.artworkLocation.length} caractères restants
              </span>
            ) : null}
          </div>
        </label>
      </div>
      {!formArtwork.name ||
      !artist ||
      !type ||
      !artTrend ||
      !technique ||
      (!formTechnique.name &&
        parseInt(technique, 10) ===
          Math.max(...dataTechnique.map((item) => item.id)) + 1) ||
      (!formArtTrend.name &&
        parseInt(artTrend, 10) ===
          Math.max(...dataArtTrend.map((item) => item.id)) + 1) ? (
        <p className="text-red-500 text-center">
          Les champs suivis d'un * sont obligatoires.
        </p>
      ) : null}
      <div className="flex justify-between py-4 lg:justify-around">
        <div className="px-[10px] w-[150px] h-[30px] lg:w-[200px]">
          <GreyButton text="Précédent" onClick={prevStep} />
        </div>
        <div className="px-[10px] w-[150px] h-[30px] lg:w-[200px] ">
          {parseInt(artist, 10) ===
            Math.max(...dataArtist.map((item) => item.id)) + 1 &&
          technique &&
          artTrend &&
          formArtwork.name ? (
            <RedButton
              type="button"
              text="Suivant"
              onClick={() => {
                nextStep();
                jointureVerify();
              }}
              disabled={
                !formArtwork.name ||
                !artist ||
                !type ||
                !artTrend ||
                !technique ||
                (!formTechnique.name &&
                  parseInt(technique, 10) ===
                    Math.max(...dataTechnique.map((item) => item.id)) + 1) ||
                (!formArtTrend.name &&
                  parseInt(artTrend, 10) ===
                    Math.max(...dataArtTrend.map((item) => item.id)) + 1) ||
                (!formArtist.nickname &&
                  parseInt(artist, 10) ===
                    Math.max(...dataArtist.map((item) => item.id)) + 1) ||
                (!formType.name &&
                  parseInt(type, 10) ===
                    Math.max(...dataType.map((item) => item.id)) + 1)
              }
            />
          ) : (
            <RedButton
              type="submit"
              text={
                parseInt(artist, 10) ===
                Math.max(...dataArtist.map((item) => item.id)) + 1
                  ? "Suivant"
                  : "Valider"
              }
              onClick={() => {
                nextStep();
                jointureVerify();
              }}
              disabled={
                !formArtwork.name ||
                !artist ||
                !type ||
                !artTrend ||
                !technique ||
                (!formTechnique.name &&
                  parseInt(technique, 10) ===
                    Math.max(...dataTechnique.map((item) => item.id)) + 1) ||
                (!formArtTrend.name &&
                  parseInt(artTrend, 10) ===
                    Math.max(...dataArtTrend.map((item) => item.id)) + 1) ||
                (!formType.name &&
                  parseInt(type, 10) ===
                    Math.max(...dataType.map((item) => item.id)) + 1)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

ArtworkForm2.propTypes = {
  modalRef: PropTypes.shape(),
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
  isLoadedArtist: PropTypes.bool.isRequired,
  isLoadedType: PropTypes.bool.isRequired,
  isLoadedTechnique: PropTypes.bool.isRequired,
  isLoadedArtTrend: PropTypes.bool.isRequired,
  dataArtist: PropTypes.arrayOf(
    PropTypes.shape({
      lastname: PropTypes.string,
      firstname: PropTypes.string,
      nickname: PropTypes.string,
      description: PropTypes.string,
      imageUrlSmall: PropTypes.string,
      imageUrlMedium: PropTypes.string,
      imageUrlLarge: PropTypes.string,
      websiteUrl: PropTypes.string,
      facebookUrl: PropTypes.string,
      instagramUrl: PropTypes.string,
      twitterUrl: PropTypes.string,
    })
  ),

  dataType: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  dataTechnique: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  dataArtTrend: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    })
  ),
  handleJointureArtisteArtTrend: PropTypes.func.isRequired,
  handleJointureArtisteTechnique: PropTypes.func.isRequired,
  jointureVerify: PropTypes.func.isRequired,
};

ArtworkForm2.defaultProps = {
  modalRef: {},
  prevStep: () => {},
  nextStep: () => {},
  dataArtist: {
    lastname: "",
    firstname: "",
    nickname: "",
    description: "",
    imageUrlSmall: "",
    imageUrlMedium: "",
    imageUrlLarge: "",
    websiteUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
  },
  dataType: {
    name: "",
  },
  dataTechnique: {
    name: "",
  },
  dataArtTrend: {
    name: "",
  },
};

export default ArtworkForm2;

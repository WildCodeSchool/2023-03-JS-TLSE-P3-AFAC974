/* eslint-disable react/prop-types */
import React, { useContext } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";
import SelectionInput from "../SelectionInput";
import { AddArtworkContext } from "../../context/AddArtworkContext";
import { DataProjectContext } from "../../context/DataProjectContext";

function ArtworkForm2({ modalRef, prevStep, nextStep }) {
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
  } = useContext(AddArtworkContext);
  const {
    isLoadedArtist,
    isLoadedType,
    isLoadedTechnique,
    isLoadedArtTrend,
    dataArtist,
    dataType,
    dataTechnique,
    dataArtTrend,
  } = useContext(DataProjectContext);
  return (
    <div ref={modalRef} className="h-full flex flex-col justify-between">
      <div>
        <h2 className="font-semibold text-[20px]">Informations de l'oeuvre</h2>
      </div>
      <div className="text-[16px] lg:flex flex-col lg:justify-between">
        <div className="lg:flex lg:justify-center lg:gap-4">
          <label htmlFor="artwork_name" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom de l'oeuvre</h3>
            <div>
              <Input
                type="text"
                id="artwork_name"
                name="name"
                placeholder="Saisir le nom de l'oeuvre"
                onChange={handleInputChangeArtwork}
                value={formArtwork.name}
              />
            </div>
          </label>
          <label htmlFor="artist_name_artwork" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Nom de l'artiste</h3>
            <SelectionInput
              handleInputChange={handleInputChangeArtwork}
              idSelection={artist}
              setIdSelection={setArtist}
              isLoaded={isLoadedArtist}
              data={dataArtist}
              name="artist_id"
              id="artist-select"
              text="Artiste"
            />
            {parseInt(artist, 10) === dataArtist.length + 1 ? (
              <Input
                type="text"
                id="artist-select"
                name="nickname"
                placeholder="Saisir un nom d'artiste"
                onChange={handleInputChangeArtist}
                value={formArtist.nickname}
              />
            ) : null}
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
                value={formArtwork.year}
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
                  className="flex justify-between items-center w-[100%] gap-2"
                >
                  <h4 className="w-content text-[14px]">L</h4>
                  <div className="lg:w-[40px] xl:w-[50px]">
                    <Input
                      type="text"
                      id="length_artwork"
                      name="length_cm"
                      placeholder=""
                      onChange={handleInputChangeArtwork}
                      value={formArtwork.length_cm}
                    />
                  </div>
                </label>
                <label
                  htmlFor="width"
                  className="flex justify-between items-center w-[100%] gap-2"
                >
                  <h4 className="w-content text-[14px]">l</h4>
                  <div className="lg:w-[40px] xl:w-[50px]">
                    <Input
                      type="text"
                      id="width_artwork"
                      name="width_cm"
                      placeholder=""
                      onChange={handleInputChangeArtwork}
                      value={formArtwork.width_cm}
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
                      name="height_cm"
                      placeholder=""
                      onChange={handleInputChangeArtwork}
                      value={formArtwork.height_cm}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <label htmlFor="type_artwork" className="w-[100%]">
            <h3 className="py-4 text-[14px]">Type d'oeuvre</h3>
            <SelectionInput
              handleInputChange={handleInputChangeArtwork}
              idSelection={type}
              setIdSelection={setType}
              isLoaded={isLoadedType}
              data={dataType}
              name="type_id"
              id="type_artwork"
              text="Type"
            />
            {parseInt(type, 10) === dataType.length + 1 ? (
              <Input
                type="text"
                id="type_artwork"
                name="name"
                placeholder="Type d'oeuvre"
                onChange={handleInputChangeType}
                value={formType.name}
              />
            ) : null}
          </label>
          <label htmlFor="art_trend_artwork" className="w-[100%]">
            <h3 className="py-4 flex-nowrap text-[14px]">Courant artistique</h3>
            <SelectionInput
              handleInputChange={handleInputChangeArtwork}
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
          </label>
        </div>
      </div>
      <div className="w-full lg:flex lg:justify-center">
        <label htmlFor="artwork_technical" className="w-[100%] lg:w-auto">
          <h3 className="py-4 text-[14px]">Technique</h3>
          <SelectionInput
            handleInputChange={handleInputChangeArtwork}
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
  formArtwork: PropTypes.shape({
    name: PropTypes.string,
    year: PropTypes.string,
    description: PropTypes.string,
    art_trend_id: PropTypes.string,
    type_id: PropTypes.string,
    technique_id: PropTypes.string,
    artist_id: PropTypes.string,
    width_cm: PropTypes.string,
    length_cm: PropTypes.string,
    height_cm: PropTypes.string,
  }),
  modalRef: PropTypes.shape(),
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
};

ArtworkForm2.defaultProps = {
  formArtwork: {
    name: "",
    year: "",
    description: "",
    art_trend_id: "",
    type_id: "",
    technique_id: "",
    artist_id: "",
    width_cm: "",
    length_cm: "",
    height_cm: "",
  },
  modalRef: {},
  prevStep: () => {},
  nextStep: () => {},
};

export default ArtworkForm2;

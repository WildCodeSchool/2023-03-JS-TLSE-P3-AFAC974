import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";
import SelectionInput from "../SelectionInput";
import { FormArtworkArtistContext } from "../../context/FormArtworkArtistContext";

function ArtworkFormModify({
  prevStep,
  nextStep,
  modify,
  selectedArtistId,
  selectedTypeId,
  selectedTechniqueId,
  selectedArtTrendId,
}) {
  const {
    artist,
    setArtisteTechniqueUpload,
    setArtTrendArtistUpload,
    handleJointureArtisteTechnique,
    handleJointureArtisteArtTrend,
    setArtist,
    type,
    setType,
    artTrend,
    setArtTrend,
    technique,
    setTechnique,
    formArtwork,
    handleInputChangeArtwork,
    needToFetch,
  } = useContext(FormArtworkArtistContext);

  const [isLoadedArtist, setIsLoadedArtist] = useState(false);
  const [isLoadedType, setIsLoadedType] = useState(false);
  const [isLoadedTechnique, setIsLoadedTechnique] = useState(false);
  const [isLoadedArtTrend, setIsLoadedArtTrend] = useState(false);
  const [isLoadedArtistTechnique, setIsLoadedArtistTechnique] = useState(false);
  const [isLoadedArtTrendArtist, setIsLoadedArtTrendArtist] = useState(false);
  const [dataArtist, setDataArtist] = useState(false);
  const [dataType, setDataType] = useState(false);
  const [dataTechnique, setDataTechnique] = useState(false);
  const [dataArtTrend, setDataArtTrend] = useState(false);
  const [dataArtistTechnique, setDataArtistTechnique] = useState(false);
  const [dataArtTrendArtist, setDataArtTrendArtist] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists`)
      .then((res) => {
        setDataArtist(res.data);
        setIsLoadedArtist(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/types`)
      .then((res) => {
        setDataType(res.data);
        setIsLoadedType(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/techniques`)
      .then((res) => {
        setDataTechnique(res.data);
        setIsLoadedTechnique(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/arttrends`)
      .then((res) => {
        setDataArtTrend(res.data);
        setIsLoadedArtTrend(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists-techniques`)
      .then((res) => {
        setDataArtistTechnique(res.data);
        setIsLoadedArtistTechnique(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/arttrends-artists`)
      .then((res) => {
        setDataArtTrendArtist(res.data);
        setIsLoadedArtTrendArtist(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  const [isLoadedArtistId, setIsLoadedArtistId] = useState(false);
  const [isLoadedTypeId, setIsLoadedTypeId] = useState(false);
  const [isLoadedTechniqueId, setIsLoadedTechniqueId] = useState(false);
  const [isLoadedArtTrendId, setIsLoadedArtTrendId] = useState(false);
  const [dataArtistId, setDataArtistId] = useState(false);
  const [dataTypeId, setDataTypeId] = useState(false);
  const [dataTechniqueId, setDataTechniqueId] = useState(false);
  const [dataArtTrendId, setDataArtTrendId] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists/${selectedArtistId}`)
      .then((res) => {
        setDataArtistId(res.data[0].nickname);
        setIsLoadedArtistId(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch, selectedArtistId]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/types/${selectedTypeId}`)
      .then((res) => {
        setDataTypeId(res.data[0].name);
        setIsLoadedTypeId(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch, selectedTypeId]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/techniques/${selectedTechniqueId}`
      )
      .then((res) => {
        setDataTechniqueId(res.data[0].name);
        setIsLoadedTechniqueId(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch, selectedTechniqueId]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/arttrends/${selectedArtTrendId}`
      )
      .then((res) => {
        setDataArtTrendId(res.data[0].name);
        setIsLoadedArtTrendId(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch, selectedArtTrendId]);

  const jointureVerify = () => {
    if (isLoadedArtTrendArtist && isLoadedArtistTechnique) {
      const foundArtTrendArtist = dataArtTrendArtist.some(
        (item) =>
          item.artist_id === parseInt(artist, 10) &&
          item.art_trend_id === parseInt(artTrend, 10)
      );
      setArtTrendArtistUpload(foundArtTrendArtist);

      const foundArtistTechnique = dataArtistTechnique.some(
        (item) =>
          item.artist_id === parseInt(artist, 10) &&
          item.technique_id === parseInt(technique, 10)
      );
      setArtisteTechniqueUpload(foundArtistTechnique);
    }
  };

  return (
    <div>
      {isLoadedArtist &&
      isLoadedType &&
      isLoadedTechnique &&
      isLoadedArtTrend &&
      isLoadedArtistTechnique &&
      isLoadedArtTrendArtist &&
      isLoadedArtistId &&
      isLoadedTypeId &&
      isLoadedTechniqueId &&
      isLoadedArtTrendId ? (
        <div className="h-full flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-[20px]">
              Informations de l'oeuvre
            </h2>
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
                    maxLength={255}
                  />
                  {255 - formArtwork.name.length <= 50 ? (
                    <span
                      className={
                        255 - formArtwork.name.length === 0
                          ? "text-red-500"
                          : ""
                      }
                    >
                      {255 - formArtwork.name.length} caractères restants
                    </span>
                  ) : null}
                </div>
              </label>
              <label htmlFor="artist_name_artwork" className="w-[100%]">
                <h3 className="py-4 text-[14px]">Nom de l'artiste</h3>
                <div>
                  <SelectionInput
                    handleInputChange={handleInputChangeArtwork}
                    handleJointureArtisteArtTrend={
                      handleJointureArtisteArtTrend
                    }
                    handleJointureArtisteTechnique={
                      handleJointureArtisteTechnique
                    }
                    idSelection={artist}
                    setIdSelection={setArtist}
                    isLoaded={isLoadedArtist}
                    isLoadedId={isLoadedArtistId}
                    dataId={dataArtistId}
                    dataNameId={dataArtistId}
                    data={dataArtist}
                    name="artistId"
                    id="artist-select"
                    text="Artiste"
                    modify={modify}
                  />
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
                  <h3 className="py-4  w-[100%] text-[14px]">
                    Dimensions (en cm)
                  </h3>
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
                          value={formArtwork.widthCm}
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
                          value={formArtwork.heightCm}
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
                          value={formArtwork.depthCm}
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <label htmlFor="type_artwork" className="w-[100%]">
                <h3 className="py-4 text-[14px]">Type d'oeuvre</h3>
                <div>
                  <SelectionInput
                    handleInputChange={handleInputChangeArtwork}
                    idSelection={type}
                    setIdSelection={setType}
                    isLoadedId={isLoadedTypeId}
                    isLoaded={isLoadedType}
                    dataId={dataTypeId}
                    dataNameId={dataTypeId}
                    data={dataType}
                    name="typeId"
                    id="type_artwork"
                    text="Type"
                    modify={modify}
                  />
                </div>
              </label>
              <label htmlFor="art_trend_artwork" className="w-[100%]">
                <h3 className="py-4 flex-nowrap text-[14px]">
                  Courant artistique
                </h3>
                <div>
                  <SelectionInput
                    handleInputChange={handleInputChangeArtwork}
                    handleJointureArtisteArtTrend={
                      handleJointureArtisteArtTrend
                    }
                    idSelection={artTrend}
                    setIdSelection={setArtTrend}
                    isLoaded={isLoadedArtTrend}
                    data={dataArtTrend}
                    isLoadedId={isLoadedArtTrendId}
                    dataId={dataArtTrendId}
                    dataNameId={dataArtTrendId}
                    name="artTrendId"
                    id="art_trend_artwork"
                    text="Courant Artistique"
                    modify={modify}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="w-full lg:flex lg:justify-center gap-8">
            <label htmlFor="artwork_technical" className="w-[100%] lg:w-auto">
              <h3 className="py-4 text-[14px]">Technique</h3>
              <div>
                <SelectionInput
                  handleInputChange={handleInputChangeArtwork}
                  handleJointureArtisteTechnique={
                    handleJointureArtisteTechnique
                  }
                  idSelection={technique}
                  setIdSelection={setTechnique}
                  isLoaded={isLoadedTechnique}
                  data={dataTechnique}
                  isLoadedId={isLoadedTechniqueId}
                  dataId={dataTechniqueId}
                  dataNameId={dataTechniqueId}
                  name="techniqueId"
                  id="artwork_technical"
                  placeholder="Technique"
                  text="Technique"
                  modify={modify}
                />
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
                    {255 - formArtwork.artworkLocation.length} caractères
                    restants
                  </span>
                ) : null}
              </div>
            </label>
          </div>
          <div className="flex justify-between py-4 lg:justify-around">
            <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%]">
              <GreyButton text="Annuler" onClick={prevStep} />
            </div>
            <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%] ">
              <RedButton
                type="submit"
                text="Valider"
                onClick={() => {
                  nextStep();
                  jointureVerify();
                }}
                disabled={!formArtwork.name}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

ArtworkFormModify.propTypes = {
  prevStep: PropTypes.func,
  nextStep: PropTypes.func,
  modify: PropTypes.bool,
  selectedTypeId: PropTypes.number,
  selectedTechniqueId: PropTypes.number,
  selectedArtTrendId: PropTypes.number,
  selectedArtistId: PropTypes.number,
};

ArtworkFormModify.defaultProps = {
  prevStep: () => {},
  nextStep: () => {},
  modify: false,
  selectedTypeId: null,
  selectedTechniqueId: null,
  selectedArtTrendId: null,
  selectedArtistId: null,
};

export default ArtworkFormModify;

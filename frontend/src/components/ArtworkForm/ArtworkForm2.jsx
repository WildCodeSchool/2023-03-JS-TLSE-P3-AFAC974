import React, { useState, useEffect } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";

function ArtworkForm2({
  formArtwork,
  handleInputChangeArtwork,
  modalRef,
  prevStep,
  nextStep,
}) {
  const [isLoadedArtist, setIsLoadedArtist] = useState(false);
  const [isLoadedType, setIsLoadedType] = useState(false);
  const [isLoadedTechnique, setIsLoadedTechnique] = useState(false);
  const [isLoadedArtTrend, setIsLoadedArtTrend] = useState(false);
  const [dataArtist, setDataArtist] = useState(false);
  const [dataType, setDataType] = useState(false);
  const [dataTechnique, setDataTechnique] = useState(false);
  const [dataArtTrend, setDataArtTrend] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/artists`)
      .then((res) => {
        setDataArtist(res.data);
        setIsLoadedArtist(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/type`)
      .then((res) => {
        setDataType(res.data);
        setIsLoadedType(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/technique`)
      .then((res) => {
        setDataTechnique(res.data);
        setIsLoadedTechnique(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/arttrend`)
      .then((res) => {
        setDataArtTrend(res.data);
        setIsLoadedArtTrend(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const [artist, setArtist] = useState("");
  // console.log(artist);
  const [type, setType] = useState("");
  const [artTrend, setArtTrend] = useState("");
  const [technique, setTechnique] = useState("");

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
            <div>
              {isLoadedArtist ? (
                <select
                  name="artist_id"
                  id="artist-select"
                  className={!artist ? "text-gray-400" : ""}
                  value={artist || ""}
                  onChange={(event) => {
                    setArtist(event.target.value);
                    handleInputChangeArtwork(event);
                  }}
                >
                  <option value="" className={artist ? "text-gray-400" : ""}>
                    {artist || "Artiste"}
                  </option>
                  {dataArtist.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nickname}
                    </option>
                  ))}
                  <option value={dataArtist.length + 1}>Autre</option>
                </select>
              ) : null}
              {parseInt(artist, 10) === dataArtist.length + 1 ? (
                <Input
                  type="text"
                  id="artist_name_artwork"
                  name="artist_id"
                  placeholder="Saisir un nom d'artiste"
                  onChange={handleInputChangeArtwork}
                  value={
                    parseInt(formArtwork.artist_id, 10) ===
                      dataArtist.length + 1 && ""
                  }
                />
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
            <div>
              {isLoadedType ? (
                <select
                  name="type_id"
                  id="type_artwork"
                  className={!type ? "text-gray-400" : ""}
                  value={type || ""}
                  onChange={(event) => {
                    setType(event.target.value);
                    handleInputChangeArtwork(event);
                  }}
                >
                  <option value="" className={type ? "text-gray-400" : ""}>
                    {type || "Type"}
                  </option>
                  {dataType.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                  <option value={dataType.length + 1}>Autre</option>
                </select>
              ) : null}
              {parseInt(type, 10) === dataType.length + 1 ? (
                <Input
                  type="text"
                  id="type_artwork"
                  name="type_id"
                  placeholder="Type d'oeuvre"
                  onChange={handleInputChangeArtwork}
                  value={
                    parseInt(formArtwork.type_id, 10) === dataType.length + 1 &&
                    ""
                  }
                />
              ) : null}
            </div>
          </label>
          <label htmlFor="art_trend_artwork" className="w-[100%]">
            <h3 className="py-4 flex-nowrap text-[14px]">Courant artistique</h3>
            <div>
              {isLoadedArtTrend ? (
                <select
                  name="art_trend_id"
                  id="art_trend_artwork"
                  className={!artTrend ? "text-gray-400" : ""}
                  value={artTrend || ""}
                  onChange={(event) => {
                    setArtTrend(event.target.value);
                    handleInputChangeArtwork(event);
                  }}
                >
                  <option value="" className={artTrend ? "text-gray-400" : ""}>
                    {artTrend || "Courant Artistique"}
                  </option>
                  {dataArtTrend.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                  <option value={dataArtTrend.length + 1}>Autre</option>
                </select>
              ) : null}
              {parseInt(artTrend, 10) === dataArtTrend.length + 1 ? (
                <Input
                  type="text"
                  id="art_trend_artwork"
                  name="art_trend_id"
                  placeholder="Courant artistique"
                  onChange={handleInputChangeArtwork}
                  value={
                    parseInt(formArtwork.art_trend_id, 10) ===
                      dataArtTrend.length + 1 && ""
                  }
                />
              ) : null}
            </div>
          </label>
        </div>
      </div>
      <div className="w-full lg:flex lg:justify-center">
        <label htmlFor="artwork_technical" className="w-[100%] lg:w-auto">
          <h3 className="py-4 text-[14px]">Technique</h3>
          <div>
            {isLoadedTechnique ? (
              <select
                name="technique_id"
                id="artwork_technical"
                className={!technique ? "text-gray-400" : ""}
                value={technique || ""}
                onChange={(event) => {
                  setTechnique(event.target.value);
                  handleInputChangeArtwork(event);
                }}
              >
                <option value="" className={technique ? "text-gray-400" : ""}>
                  Technique
                </option>
                {dataTechnique.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
                <option value={dataTechnique.length + 1}>Autre</option>
              </select>
            ) : null}
            {parseInt(technique, 10) === dataTechnique.length + 1 ? (
              <Input
                type="text"
                id="artwork_technical"
                name="technique_id"
                placeholder="Technique"
                onChange={handleInputChangeArtwork}
                value={
                  parseInt(formArtwork.technique_id, 10) ===
                    dataArtTrend.length + 1 && ""
                }
              />
            ) : null}
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
  handleInputChangeArtwork: PropTypes.func,
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
  handleInputChangeArtwork: () => {},
  modalRef: {},
  prevStep: () => {},
  nextStep: () => {},
};

export default ArtworkForm2;

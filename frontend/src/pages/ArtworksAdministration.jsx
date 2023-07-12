import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AddArtwork from "../components/AddArtwork";
import ModifyArtwork from "../components/ModifyArtwork";
import ValidationModal from "../components/ValidationModal";
import ConfirmationModal from "../components/ConfirmationModal";
import SearchBar from "../components/SearchBar";
import SortBy from "../components/SortBy";
import { FormArtworkArtistContext } from "../context/FormArtworkArtistContext";
import ValidationPicture from "../assets/Validation.png";
import ErrorPicture from "../assets/Erreur.png";
import userSample from "../assets/user_sample.png";
import addCircle from "../assets/add-circle.png";
import crossDelete from "../assets/crossDelete.png";
import engrenage from "../assets/Engrenage.png";

export default function ArtworksAdministration() {
  const {
    artist,
    type,
    artTrend,
    technique,
    formArtwork,
    formType,
    formTechnique,
    formArtTrend,
    formArtTrendArtist,
    formArtistTechnique,
    artTrendArtistUpload,
    artisteTechniqueUpload,
    needToFetch,
    setNeedToFetch,
    setArtworkPreview,
    setArtistPreview,
    setFormArtwork,
    setFormArtist,
    setFormType,
    setFormTechnique,
    setFormArtTrend,
    setFormArtTrendArtist,
    setFormArtistTechnique,
    setArtist,
    setTechnique,
    setArtTrend,
    setType,
    setArtistPicture,
    setArtworkPicture,
  } = useContext(FormArtworkArtistContext);

  const [modalOpenAdd, setModalOpenAdd] = useState(false);
  const [modalConfirmationAdd, setModalConfirmationAdd] = useState(false);
  const [modalValidationAdd, setModalValidationAdd] = useState(false);
  const [modalErrorAdd, setModalErrorAdd] = useState(false);

  const [modalConfirmationDeleteArtwork, setModalConfirmationDeleteArtwork] =
    useState(false);
  const [modalValidationDeleteArtwork, setModalValidationDeleteArtwork] =
    useState(false);
  const [modalErrorDeleteArtwork, setModalErrorDeleteArtwork] = useState(false);

  const [modalOpenModifyArtwork, setModalOpenModifyArtwork] = useState(false);
  const [modalConfirmationModifyArtwork, setModalConfirmationModifyArtwork] =
    useState(false);
  const [modalValidationModifyArtwork, setModalValidationModifyArtwork] =
    useState(false);
  const [modalErrorModifyArtwork, setModalErrorModifyArtwork] = useState(false);

  const [step, setStep] = useState(1);

  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [selectedUrlArtworkId, setSelectedUrlArtworkId] = useState(null);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [selectedTechniqueId, setSelectedTechniqueId] = useState(null);
  const [selectedArtTrendId, setSelectedArtTrendId] = useState(null);
  const [selectedArtistId, setSelectedArtistId] = useState(null);

  const openModalAdd = () => {
    setModalOpenAdd(true);
  };

  const openModalModifyArtwork = () => {
    setModalOpenModifyArtwork(true);
  };

  const handleCancelModifyArtwork = () => {
    setStep(1);
    setModalOpenModifyArtwork(false);
    setModalConfirmationModifyArtwork(false);
    setFormArtwork({
      name: "",
      year: 0,
      description: "",
      imageUrlSmall: "",
      imageUrlMedium: "",
      imageUrlLarge: "",
      artTrendId: "",
      typeId: "",
      techniqueId: "",
      artistId: "",
      widthCm: 0,
      heightCm: 0,
      depthCm: 0,
      artworkLocation: "",
    });
    setFormArtTrendArtist({ artistId: "", artTrendId: "" });
    setFormArtistTechnique({ artistId: "", techniqueId: "" });
  };

  const handleCancelAdd = () => {
    setStep(1);
    setModalOpenAdd(false);
    setModalConfirmationAdd(false);
    setArtworkPreview("");
    setArtistPreview("");
    setFormArtwork({
      name: "",
      year: 0,
      description: "",
      imageUrlSmall: "",
      imageUrlMedium: "",
      imageUrlLarge: "",
      artTrendId: "",
      typeId: "",
      techniqueId: "",
      artistId: "",
      widthCm: 0,
      heightCm: 0,
      depthCm: 0,
      artworkLocation: "",
    });
    setFormArtist({
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
    });
    setFormType({ name: "" });
    setFormArtTrend({ name: "" });
    setFormTechnique({ name: "" });
    setFormArtTrendArtist({ artistId: "", artTrendId: "" });
    setFormArtistTechnique({ artistId: "", techniqueId: "" });
    setArtist("");
    setTechnique("");
    setArtTrend("");
    setType("");
    setArtistPicture(null);
    setArtworkPicture(null);
  };
  const handleCancelDeleteArtwork = () => {
    setModalConfirmationDeleteArtwork(false);
  };

  const [isLoadedArtist, setIsLoadedArtist] = useState(false);
  const [isLoadedType, setIsLoadedType] = useState(false);
  const [isLoadedTechnique, setIsLoadedTechnique] = useState(false);
  const [isLoadedArtTrend, setIsLoadedArtTrend] = useState(false);
  const [dataArtist, setDataArtist] = useState(false);
  const [dataType, setDataType] = useState(false);
  const [dataTechnique, setDataTechnique] = useState(false);
  const [dataArtTrend, setDataArtTrend] = useState(false);
  const [dataArtworks, setDataArtworks] = useState(false);
  const [isLoadedArtworks, setIsLoadedArtworks] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks`)
      .then((res) => {
        setDataArtworks(res.data);
        setIsLoadedArtworks(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

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
      .get(`${import.meta.env.VITE_BACKEND_URL}/arttrend`)
      .then((res) => {
        setDataArtTrend(res.data);
        setIsLoadedArtTrend(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  const rollbackData = [];
  const rollbackDataJointureTechnique = [];
  const rollbackDataJointureArtTrend = [];
  const deleteError = () => {
    try {
      const rollbackPromises = () => {
        rollbackData.map((data) =>
          axios
            .delete(
              `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}/${data.id}`
            )
            .catch((errorDelete) => {
              console.error(
                `Erreur lors de l'annulation de ${data.endpoint}/${data.id}:`,
                errorDelete
              );
            })
        );
      };

      const rollbackPromisesJointureArtTrend = () => {
        rollbackDataJointureArtTrend.map((data) =>
          axios
            .delete(
              `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}?artist_id=${
                data.artistId
              }&art_trend_id=${data.artTrendId}`
            )
            .then(rollbackPromises())
            .catch((errorDelete) => {
              console.error(
                `Erreur lors de l'annulation de ${data.endpoint}:`,
                errorDelete
              );
            })
        );
      };

      rollbackDataJointureTechnique.map((data) =>
        axios
          .delete(
            `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}?artist_id=${
              data.artistId
            }&technique_id=${data.techniqueId}`
          )
          .then(rollbackPromisesJointureArtTrend())
          .catch((errorDelete) => {
            console.error(
              `Erreur lors de l'annulation de ${data.endpoint}:`,
              errorDelete
            );
          })
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  const handleArtworkUpload = async (temporaryArtwork, temporaryArtist) => {
    try {
      const postArtwork = (newFormArtwork) => {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/artworks`, newFormArtwork)
          .then((artworkResponse) => {
            rollbackData.push({
              endpoint: "artworks",
              id: artworkResponse.data[0].insertId,
            });
            setNeedToFetch(!needToFetch);
            setModalValidationAdd(true);
          })
          .catch((error) => {
            console.error("Erreur lors de l'envoi de l'oeuvre :", error);
            setNeedToFetch(!needToFetch);
            setModalErrorAdd(true);
            deleteError();
          });
      };

      const checkAndPostArtistTechnique = (
        newFormArtistTechnique,
        newFormArtwork
      ) => {
        if (!artisteTechniqueUpload) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/artists-technique`,
              newFormArtistTechnique
            )
            .then(() => {
              rollbackDataJointureTechnique.push({
                endpoint: "artisttechnique",
                artistId: newFormArtwork.artistId,
                techniqueId: newFormArtwork.techniqueId,
              });
              postArtwork(newFormArtwork);
            })
            .catch((error) => {
              console.error(
                "Erreur lors de l'envoi sur la jointure entre la technique et l'artiste :",
                error
              );
              setNeedToFetch(!needToFetch);
              setModalErrorAdd(true);
              deleteError();
            });
        } else {
          postArtwork(newFormArtwork);
        }
      };

      const checkAndPostArtTrendArtist = (
        newFormArtTrendArtist,
        newFormArtistTechnique,
        newFormArtwork
      ) => {
        if (!artTrendArtistUpload) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/arttrend-artist`,
              newFormArtTrendArtist
            )
            .then(() => {
              rollbackDataJointureArtTrend.push({
                endpoint: "arttrendartist",
                artistId: newFormArtwork.artistId,
                artTrendId: newFormArtwork.artTrendId,
              });
              checkAndPostArtistTechnique(
                newFormArtistTechnique,
                newFormArtwork
              );
            })
            .catch((error) => {
              console.error(
                "Erreur lors de l'envoi sur la jointure entre artTrend et artist :",
                error
              );
              setNeedToFetch(!needToFetch);
              setModalErrorAdd(true);
              deleteError();
            });
        } else {
          checkAndPostArtistTechnique(newFormArtistTechnique, newFormArtwork);
        }
      };

      const checkAndPostArtist = (
        typeResponseSend,
        techniqueResponseSend,
        artTrendResponseSend
      ) => {
        if (
          parseInt(artist, 10) ===
          Math.max(...dataArtist.map((item) => item.id)) + 1
        ) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/artists`,
              temporaryArtist
            )
            .then((artistResponse) => {
              rollbackData.push({
                endpoint: "artists",
                id: artistResponse.data[0].insertId,
              });
              const newFormArtwork = {
                ...temporaryArtwork,
                artistId: artistResponse.data[0].insertId,
                techniqueId: techniqueResponseSend,
                artTrendId: artTrendResponseSend,
                typeId: typeResponseSend,
              };
              const newFormArtTrendArtist = {
                ...formArtTrendArtist,
                artistId: artistResponse.data[0].insertId,
                artTrendId: artTrendResponseSend,
              };
              const newFormArtistTechnique = {
                ...formArtistTechnique,
                artistId: artistResponse.data[0].insertId,
                techniqueId: techniqueResponseSend,
              };
              checkAndPostArtTrendArtist(
                newFormArtTrendArtist,
                newFormArtistTechnique,
                newFormArtwork
              );
            })
            .catch((error) => {
              console.error("Erreur lors de l'envoi de l'artiste :", error);
              setNeedToFetch(!needToFetch);
              setModalErrorAdd(true);
              deleteError();
            });
        } else {
          const newFormArtTrendArtist = {
            ...formArtTrendArtist,
            artistId: parseInt(artist, 10),
            artTrendId: artTrendResponseSend,
          };
          const newFormArtistTechnique = {
            ...formArtistTechnique,
            artistId: parseInt(artist, 10),
            techniqueId: techniqueResponseSend,
          };
          const newFormArtwork = {
            ...temporaryArtwork,
            artistId: parseInt(artist, 10),
            techniqueId: techniqueResponseSend,
            artTrendId: artTrendResponseSend,
            typeId: typeResponseSend,
          };
          checkAndPostArtTrendArtist(
            newFormArtTrendArtist,
            newFormArtistTechnique,
            newFormArtwork
          );
        }
      };

      const checkAndPostArtTRend = (
        typeResponseSend,
        techniqueResponseSend
      ) => {
        if (
          parseInt(artTrend, 10) ===
          Math.max(...dataArtTrend.map((item) => item.id)) + 1
        ) {
          axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/arttrend`, formArtTrend)
            .then((artTrendResponse) => {
              rollbackData.push({
                endpoint: "arttrend",
                id: artTrendResponse.data[0].insertId,
              });
              const artTrendResponseSend = artTrendResponse.data[0].insertId;
              checkAndPostArtist(
                typeResponseSend,
                techniqueResponseSend,
                artTrendResponseSend
              );
            })
            .catch((error) => {
              console.error(
                "Erreur lors de l'envoi du courant artistique :",
                error
              );
              setNeedToFetch(!needToFetch);
              setModalErrorAdd(true);
              deleteError();
            });
        } else {
          const artTrendResponseSend = artTrend;
          checkAndPostArtist(
            typeResponseSend,
            techniqueResponseSend,
            artTrendResponseSend
          );
        }
      };

      const checkAndPostTechnique = (typeResponseSend) => {
        if (
          parseInt(technique, 10) ===
          Math.max(...dataTechnique.map((item) => item.id)) + 1
        ) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/technique`,
              formTechnique
            )
            .then((techniqueResponse) => {
              rollbackData.push({
                endpoint: "technique",
                id: techniqueResponse.data[0].insertId,
              });
              const techniqueResponseSend = techniqueResponse.data[0].insertId;
              checkAndPostArtTRend(typeResponseSend, techniqueResponseSend);
            })
            .catch((error) => {
              console.error("Erreur lors de l'envoi de la technique :", error);
              setNeedToFetch(!needToFetch);
              setModalErrorAdd(true);
              deleteError();
            });
        } else {
          const techniqueResponseSend = technique;
          checkAndPostArtTRend(typeResponseSend, techniqueResponseSend);
        }
      };

      if (
        parseInt(type, 10) ===
        Math.max(...dataType.map((item) => item.id)) + 1
      ) {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/type`, formType)
          .then((typeResponse) => {
            rollbackData.push({
              endpoint: "type",
              id: typeResponse.data[0].insertId,
            });
            const typeResponseSend = typeResponse.data[0].insertId;
            checkAndPostTechnique(typeResponseSend);
          })
          .catch((error) => {
            console.error("Erreur lors de l'envoie du type :", error);
            setNeedToFetch(!needToFetch);
            setModalErrorAdd(true);
            deleteError();
          });
      } else {
        const typeResponseSend = type;
        checkAndPostTechnique(typeResponseSend);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      deleteError();
    }
  };

  const handleArtworkDelete = (id, url) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/artworks/${id}`)
      .then(() => {
        if (url !== "") {
          const isolationNamePicture = url.match(/\/([^/]+)\.jpg$/);
          const namePicture = isolationNamePicture[1];
          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
              data: { namePicture },
            })
            .then(() => {
              setNeedToFetch(!needToFetch);
              setModalValidationDeleteArtwork(true);
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la suppression sur cloudinary :",
                error
              );
              setNeedToFetch(!needToFetch);
              setModalErrorDeleteArtwork(true);
              deleteError();
            });
        } else {
          setNeedToFetch(!needToFetch);
          setModalValidationDeleteArtwork(true);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'oeuvre :", error);
        setNeedToFetch(!needToFetch);
        setModalErrorDeleteArtwork(true);
        deleteError();
      });
  };

  const handleArtworkModify = (id) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/artworks/${id}`, formArtwork)
      .then(() => {
        if (!artisteTechniqueUpload) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/artists-technique`,
              formArtistTechnique
            )
            .catch((error) => {
              console.error(
                "Erreur lors de l'envoi sur la jointure entre la technique et l'artiste :",
                error
              );
            });
        }
        if (!artTrendArtistUpload) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/arttrend-artist`,
              formArtTrendArtist
            )
            .catch((error) => {
              console.error(
                "Erreur lors de l'envoi sur la jointure entre artTrend et artist :",
                error
              );
            });
          setNeedToFetch(!needToFetch);
          setModalValidationDeleteArtwork(true);
        }
        setNeedToFetch(!needToFetch);
        setModalValidationModifyArtwork(true);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la modification de l'oeuvre de l'oeuvre :",
          error
        );
        setNeedToFetch(!needToFetch);
        setModalErrorModifyArtwork(true);
        deleteError();
      });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filterAndSortData = () => {
    let sortedData = [...dataArtworks];
    if (searchTerm) {
      sortedData = sortedData.filter((item) => {
        if (typeof item.name === "string") {
          return item.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    }

    if (filter === "asc") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === "desc") {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sortedData;
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filteredAndSorted = filterAndSortData();
    setFilteredAndSortedData(filteredAndSorted);
  }, [dataArtworks, searchTerm, filter]);

  return (
    <div className="pt-[52px]">
      <div className="pt-[20px] flex flex-col items-center">
        <div>
          <div className="imageCircleContainer w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden border-solid border border-gray-300">
            <img
              src={userSample}
              alt="userSample"
              className="object-cover w-full h-full"
            />
          </div>
          <h1>Gestion des oeuvres</h1>
        </div>
        <div className="invisible lg:visible">Retour </div>
        <div>
          <div>
            <div>
              <SearchBar
                searchTerm={searchTerm}
                handleinputChange={handleInputChange}
              />
            </div>
            <div>
              <SortBy handleChange={handleChange} />
            </div>
          </div>
          <button
            className="flex gap-2 border border-solid border-gray-300 rounded-[4px] p-[10px]"
            type="button"
            onClick={() => {
              openModalAdd();
              setNeedToFetch(!needToFetch);
            }}
          >
            <img src={addCircle} alt="add-circle" />
            <h1>Ajouter une oeuvre</h1>
          </button>
        </div>
      </div>
      {isLoadedArtworks &&
        filteredAndSortedData.map((itemArtwork) => (
          <div key={itemArtwork.id} className="flex flex-col lg:invisible">
            <img src={itemArtwork.image_url_medium} alt="oeuvre" />
            <div className="flex">
              <div>
                <h2>{itemArtwork.name}</h2>
                {dataArtist.map((itemArtist) => {
                  if (itemArtist.id === itemArtwork.artist_id) {
                    return (
                      <p className="text-left mb-4 text-gray-600">
                        {itemArtist.nickname}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                type="button"
                onClick={() => {
                  openModalModifyArtwork();
                  setSelectedArtworkId(itemArtwork.id);
                  setNeedToFetch(!needToFetch);
                  setSelectedTypeId(itemArtwork.type_id);
                  setSelectedTechniqueId(itemArtwork.technique_id);
                  setSelectedArtTrendId(itemArtwork.art_trend_id);
                  setSelectedArtistId(itemArtwork.artist_id);
                  setFormArtwork({
                    name: itemArtwork.name,
                    year: itemArtwork.year,
                    description: itemArtwork.description,
                    imageUrlSmall: itemArtwork.image_url_small,
                    imageUrlMedium: itemArtwork.image_url_medium,
                    imageUrlLarge: itemArtwork.image_url_large,
                    artTrendId: itemArtwork.art_trend_id,
                    typeId: itemArtwork.type_id,
                    techniqueId: itemArtwork.technique_id,
                    artistId: itemArtwork.artist_id,
                    widthCm: itemArtwork.width_cm,
                    heightCm: itemArtwork.height_cm,
                    depthCm: itemArtwork.depth_cm,
                    artworkLocation: itemArtwork.artwork_location,
                  });
                  setFormArtTrendArtist({
                    artistId: itemArtwork.artist_id,
                    artTrendId: itemArtwork.art_trend_id,
                  });
                  setFormArtistTechnique({
                    artistId: itemArtwork.artist_id,
                    techniqueId: itemArtwork.technique_id,
                  });
                }}
              >
                <img src={engrenage} alt="engrenage" />
                <h1 className="invisible">Modify</h1>
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalConfirmationDeleteArtwork(true);
                  setSelectedArtworkId(itemArtwork.id);
                  setNeedToFetch(!needToFetch);
                  setSelectedUrlArtworkId(itemArtwork.image_url_medium);
                }}
              >
                <img src={crossDelete} alt="crossDelete" />
                <h1 className="invisible">Delete</h1>
              </button>
            </div>
          </div>
        ))}
      {isLoadedArtworks &&
        dataArtworks.map((itemArtwork) => (
          <div key={itemArtwork.id} className="invisible flex lg:visible">
            MAP
            <div>
              <img src={itemArtwork.image_url_medium} alt="oeuvre" />
              <p>{itemArtwork.name}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                openModalModifyArtwork();
                setSelectedArtworkId(itemArtwork.id);
                setNeedToFetch(!needToFetch);
                setSelectedTypeId(itemArtwork.type_id);
                setSelectedTechniqueId(itemArtwork.technique_id);
                setSelectedArtTrendId(itemArtwork.art_trend_id);
                setSelectedArtistId(itemArtwork.artist_id);
                setFormArtwork({
                  name: itemArtwork.name,
                  year: itemArtwork.year,
                  description: itemArtwork.description,
                  imageUrlSmall: itemArtwork.image_url_small,
                  imageUrlMedium: itemArtwork.image_url_medium,
                  imageUrlLarge: itemArtwork.image_url_large,
                  artTrendId: itemArtwork.art_trend_id,
                  typeId: itemArtwork.type_id,
                  techniqueId: itemArtwork.technique_id,
                  artistId: itemArtwork.artist_id,
                  widthCm: itemArtwork.width_cm,
                  heightCm: itemArtwork.height_cm,
                  depthCm: itemArtwork.depth_cm,
                  artworkLocation: itemArtwork.artwork_location,
                });
                setFormArtTrendArtist({
                  artistId: itemArtwork.artist_id,
                  artTrendId: itemArtwork.art_trend_id,
                });
                setFormArtistTechnique({
                  artistId: itemArtwork.artist_id,
                  techniqueId: itemArtwork.technique_id,
                });
              }}
            >
              Modify
            </button>
            <button
              type="button"
              onClick={() => {
                setModalConfirmationDeleteArtwork(true);
                setSelectedArtworkId(itemArtwork.id);
                setNeedToFetch(!needToFetch);
                setSelectedUrlArtworkId(itemArtwork.image_url_medium);
              }}
            >
              Delete
            </button>
          </div>
        ))}

      {/* Modal for Add */}
      <AddArtwork
        isOpen={modalOpenAdd}
        setModalOpen={setModalOpenAdd}
        step={step}
        setStep={setStep}
        setModalConfirmation={setModalConfirmationAdd}
        handleCancel={handleCancelAdd}
      />
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement ajouter cette oeuvre ?"
        isOpenModalConfirmation={modalConfirmationAdd}
        setModalConfirmation={setModalConfirmationAdd}
        setStep={setStep}
        setModalValidation={setModalValidationAdd}
        handleExecution={handleArtworkUpload}
        isLoadedArtist={isLoadedArtist}
        isLoadedType={isLoadedType}
        isLoadedTechnique={isLoadedTechnique}
        isLoadedArtTrend={isLoadedArtTrend}
        handleCancel={handleCancelAdd}
        isLoadedUrlArtworks
        add
      />
      <ValidationModal
        textValidationModal="Oeuvre ajoutée"
        isOpenModalValidation={modalValidationAdd}
        setModalValidation={setModalValidationAdd}
        pictureValidationModal={ValidationPicture}
      />
      <ValidationModal
        textValidationModal="Une erreur est survenue lors de l'ajout"
        isOpenModalValidation={modalErrorAdd}
        setModalValidation={setModalErrorAdd}
        pictureValidationModal={ErrorPicture}
      />
      {/* Modal for Delete */}
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement supprimer cette oeuvre ?"
        isOpenModalConfirmation={modalConfirmationDeleteArtwork}
        setModalConfirmation={setModalConfirmationDeleteArtwork}
        setStep={setStep}
        setModalValidation={setModalValidationDeleteArtwork}
        handleExecution={() =>
          handleArtworkDelete(selectedArtworkId, selectedUrlArtworkId)
        }
        isLoadedArtist={isLoadedArtist}
        isLoadedType={isLoadedType}
        isLoadedTechnique={isLoadedTechnique}
        isLoadedArtTrend={isLoadedArtTrend}
        handleCancel={handleCancelDeleteArtwork}
        isLoadedUrlArtworks
      />
      <ValidationModal
        textValidationModal="Oeuvre supprimée"
        isOpenModalValidation={modalValidationDeleteArtwork}
        setModalValidation={setModalValidationDeleteArtwork}
        pictureValidationModal={ValidationPicture}
      />
      <ValidationModal
        textValidationModal="Une erreur est survenue lors de la suppression"
        isOpenModalValidation={modalErrorDeleteArtwork}
        setModalValidation={setModalErrorDeleteArtwork}
        pictureValidationModal={ErrorPicture}
      />
      {/* Modal for Modify */}
      <ModifyArtwork
        isOpen={modalOpenModifyArtwork}
        setModalOpen={setModalOpenModifyArtwork}
        step={step}
        setStep={setStep}
        setModalConfirmation={setModalConfirmationModifyArtwork}
        handleCancel={handleCancelModifyArtwork}
        selectedArtworkId={selectedArtworkId}
        selectedArtistId={selectedArtistId}
        selectedTypeId={selectedTypeId}
        selectedTechniqueId={selectedTechniqueId}
        selectedArtTrendId={selectedArtTrendId}
      />
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement modifier cette oeuvre ?"
        isOpenModalConfirmation={modalConfirmationModifyArtwork}
        setModalConfirmation={setModalConfirmationModifyArtwork}
        setStep={setStep}
        setModalValidation={setModalValidationModifyArtwork}
        handleExecution={() => handleArtworkModify(selectedArtworkId)}
        isLoadedArtist={isLoadedArtist}
        isLoadedType={isLoadedType}
        isLoadedTechnique={isLoadedTechnique}
        isLoadedArtTrend={isLoadedArtTrend}
        isLoadedUrlArtworks
        handleCancel={handleCancelModifyArtwork}
      />
      <ValidationModal
        textValidationModal="Oeuvre modifiée"
        isOpenModalValidation={modalValidationModifyArtwork}
        setModalValidation={setModalValidationModifyArtwork}
        pictureValidationModal={ValidationPicture}
      />
      <ValidationModal
        textValidationModal="Une erreur est survenue lors de la modification"
        isOpenModalValidation={modalErrorModifyArtwork}
        setModalValidation={setModalErrorModifyArtwork}
        pictureValidationModal={ErrorPicture}
      />
    </div>
  );
}

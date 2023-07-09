import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AddArtwork from "../components/AddArtwork";
import ModifyArtwork from "../components/ModifyArtwork";
// import ModifyArtist from "../components/ModifyArtist";
import ValidationModal from "../components/ValidationModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { FormArtworkArtistContext } from "../context/FormArtworkArtistContext";
import ValidationPicture from "../assets/Validation.png";
import ErrorPicture from "../assets/Erreur.png";

export default function ArtworksAdministration() {
  const {
    artist,
    type,
    artTrend,
    technique,
    formArtwork,
    formArtist,
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

  const [modalConfirmationDeleteArtist, setModalConfirmationDeleteArtist] =
    useState(false);
  const [modalValidationDeleteArtist, setModalValidationDeleteArtist] =
    useState(false);
  const [modalErrorDeleteArtist, setModalErrorDeleteArtist] = useState(false);

  const [modalOpenModifyArtwork, setModalOpenModifyArtwork] = useState(false);
  const [modalConfirmationModifyArtwork, setModalConfirmationModifyArtwork] =
    useState(false);
  const [modalValidationModifyArtwork, setModalValidationModifyArtwork] =
    useState(false);
  const [modalErrorModifyArtwork, setModalErrorModifyArtwork] = useState(false);

  // const [modalOpenModifyArtist, setModalOpenModifyArtist] = useState(false);
  // const [modalConfirmationModifyArtist, setModalConfirmationModifyArtist] =
  //   useState(false);
  // const [modalValidationModifyArtist, setModalValidationModifyArtist] =
  //   useState(false);
  // const [modalErrorModifyArtist, setModalErrorModifyArtist] = useState(false);

  const [step, setStep] = useState(1);

  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
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

  // const openModalModifyArtist = () => {
  //   setModalOpenModifyArtist(true);
  // };

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

  // const handleCancelModifyArtist = () => {
  //   setStep(1);
  //   setModalOpenModifyArtist(false);
  //   setModalConfirmationModifyArtist(false);
  //   setFormArtist({
  //     lastname: "",
  //     firstname: "",
  //     nickname: "",
  //     description: "",
  //     imageUrlSmall: "",
  //     imageUrlMedium: "",
  //     imageUrlLarge: "",
  //     websiteUrl: "",
  //     facebookUrl: "",
  //     instagramUrl: "",
  //     twitterUrl: "",
  //   });
  // };

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
  };
  const handleCancelDeleteArtwork = () => {
    setModalConfirmationDeleteArtwork(false);
  };

  const handleCancelDeleteArtist = () => {
    setModalConfirmationDeleteArtist(false);
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
      .get(`${import.meta.env.VITE_BACKEND_URL}/type`)
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
      .get(`${import.meta.env.VITE_BACKEND_URL}/technique`)
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

  const handleArtworkUpload = async () => {
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
              `${import.meta.env.VITE_BACKEND_URL}/artisttechnique`,
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
              `${import.meta.env.VITE_BACKEND_URL}/arttrendartist`,
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
            .post(`${import.meta.env.VITE_BACKEND_URL}/artists`, formArtist)
            .then((artistResponse) => {
              rollbackData.push({
                endpoint: "artists",
                id: artistResponse.data[0].insertId,
              });
              const newFormArtwork = {
                ...formArtwork,
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
            ...formArtwork,
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

  const handleArtworkDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/artworks/${id}`)
      .then(() => {
        setNeedToFetch(!needToFetch);
        setModalValidationDeleteArtwork(true);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'oeuvre :", error);
        setNeedToFetch(!needToFetch);
        setModalErrorDeleteArtwork(true);
        deleteError();
      });
  };

  const handleArtistDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/artists/${id}`)
      .then(() => {
        setNeedToFetch(!needToFetch);
        setModalValidationDeleteArtist(true);
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'artiste :", error);
        setNeedToFetch(!needToFetch);
        setModalErrorDeleteArtist(true);
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
              `${import.meta.env.VITE_BACKEND_URL}/artisttechnique`,
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
              `${import.meta.env.VITE_BACKEND_URL}/arttrendartist`,
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

  // const handleArtistModify = (id) => {
  //   axios
  //     .put(`${import.meta.env.VITE_BACKEND_URL}/artists/${id}`, formArtist)
  //     .then(() => {
  //       if (!artisteTechniqueUpload) {
  //         axios
  //           .post(
  //             `${import.meta.env.VITE_BACKEND_URL}/artisttechnique`,
  //             formArtistTechnique
  //           )
  //           .catch((error) => {
  //             console.error(
  //               "Erreur lors de l'envoi sur la jointure entre la technique et l'artiste :",
  //               error
  //             );
  //           });
  //       }
  //       if (!artTrendArtistUpload) {
  //         axios
  //           .post(
  //             `${import.meta.env.VITE_BACKEND_URL}/arttrendartist`,
  //             formArtTrendArtist
  //           )
  //           .catch((error) => {
  //             console.error(
  //               "Erreur lors de l'envoi sur la jointure entre artTrend et artist :",
  //               error
  //             );
  //           });
  //         setNeedToFetch(!needToFetch);
  //         setModalValidationDeleteArtwork(true);
  //       }
  //       setNeedToFetch(!needToFetch);
  //       setModalValidationModifyArtwork(true);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "Erreur lors de la modification de l'oeuvre de l'oeuvre :",
  //         error
  //       );
  //       setNeedToFetch(!needToFetch);
  //       setModalErrorModifyArtwork(true);
  //       deleteError();
  //     });
  // };

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => {
            openModalAdd();
            setNeedToFetch(!needToFetch);
          }}
        >
          Ajouter
        </button>
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
      </div>
      <div className="flex justify-center gap-10">
        {isLoadedArtworks &&
          dataArtworks.map((item) => (
            <div key={item.id} className="flex flex-col">
              <p className="border-solid border-2 border-black">{item.name}</p>
              <button
                type="button"
                onClick={() => {
                  setModalConfirmationDeleteArtwork(true);
                  setSelectedArtworkId(item.id);
                  setNeedToFetch(!needToFetch);
                }}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => {
                  openModalModifyArtwork();
                  setSelectedArtworkId(item.id);
                  setNeedToFetch(!needToFetch);
                  setSelectedTypeId(item.type_id);
                  setSelectedTechniqueId(item.technique_id);
                  setSelectedArtTrendId(item.art_trend_id);
                  setSelectedArtistId(item.artist_id);
                  setFormArtwork({
                    name: item.name,
                    year: item.year,
                    description: item.description,
                    imageUrlSmall: item.image_url_small,
                    imageUrlMedium: item.image_url_medium,
                    imageUrlLarge: item.image_url_large,
                    artTrendId: item.art_trend_id,
                    typeId: item.type_id,
                    techniqueId: item.technique_id,
                    artistId: item.artist_id,
                    widthCm: item.width_cm,
                    heightCm: item.height_cm,
                    depthCm: item.depth_cm,
                    artworkLocation: item.artwork_location,
                  });
                  setFormArtTrendArtist({
                    artistId: item.artist_id,
                    artTrendId: item.art_trend_id,
                  });
                  setFormArtistTechnique({
                    artistId: item.artist_id,
                    techniqueId: item.technique_id,
                  });
                }}
              >
                Modify
              </button>
            </div>
          ))}
      </div>
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement supprimer cette oeuvre ?"
        isOpenModalConfirmation={modalConfirmationDeleteArtwork}
        setModalConfirmation={setModalConfirmationDeleteArtwork}
        setStep={setStep}
        setModalValidation={setModalValidationDeleteArtwork}
        handleExecution={() => handleArtworkDelete(selectedArtworkId)}
        isLoadedArtist={isLoadedArtist}
        isLoadedType={isLoadedType}
        isLoadedTechnique={isLoadedTechnique}
        isLoadedArtTrend={isLoadedArtTrend}
        handleCancel={handleCancelDeleteArtwork}
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
      <div className="flex justify-center gap-10">
        {isLoadedArtist &&
          dataArtist.map((item) => (
            <div key={item.id} className="flex flex-col">
              <p className="border-solid border-2 border-black">
                {item.nickname}
              </p>
              <button
                type="button"
                onClick={() => {
                  setModalConfirmationDeleteArtist(true);
                  setSelectedArtistId(item.id);
                  setNeedToFetch(!needToFetch);
                }}
              >
                Delete
              </button>
              {/* <button
                type="button"
                onClick={() => {
                  openModalModifyArtist();
                  setNeedToFetch(!needToFetch);
                  setFormArtist({
                    lastname: item.lastname,
                    firstname: item.firstname,
                    nickname: item.nickname,
                    description: item.description,
                    imageUrlSmall: item.image_url_small,
                    imageUrlMedium: item.image_url_medium,
                    imageUrlLarge: item.image_url_large,
                    websiteUrl: item.web_site_url,
                    facebookUrl: item.facebook_url,
                    instagramUrl: item.instagram_url,
                    twitterUrl: item.twitter_url,
                  });
                }}
              >
                Modify
              </button> */}
            </div>
          ))}
      </div>
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement supprimer cet artiste ?"
        isOpenModalConfirmation={modalConfirmationDeleteArtist}
        setModalConfirmation={setModalConfirmationDeleteArtist}
        setStep={setStep}
        setModalValidation={setModalValidationDeleteArtist}
        handleExecution={() => handleArtistDelete(selectedArtistId)}
        isLoadedArtist={isLoadedArtist}
        handleCancel={handleCancelDeleteArtist}
        isLoadedType={isLoadedType}
        isLoadedTechnique={isLoadedTechnique}
        isLoadedArtTrend={isLoadedArtTrend}
      />
      <ValidationModal
        textValidationModal="Artiste supprimé"
        isOpenModalValidation={modalValidationDeleteArtist}
        setModalValidation={setModalValidationDeleteArtist}
        pictureValidationModal={ValidationPicture}
      />
      <ValidationModal
        textValidationModal="Une erreur est survenue lors de la suppression"
        isOpenModalValidation={modalErrorDeleteArtist}
        setModalValidation={setModalErrorDeleteArtist}
        pictureValidationModal={ErrorPicture}
      />
      {/* <ModifyArtist
        isOpen={modalOpenModifyArtist}
        setModalOpen={setModalOpenModifyArtist}
        step={step}
        setStep={setStep}
        setModalConfirmation={setModalConfirmationModifyArtist}
        handleCancel={handleCancelModifyArtist}
        selectedArtistId={selectedArtistId}
        selectedTypeId={selectedTypeId}
        selectedTechniqueId={selectedTechniqueId}
        selectedArtTrendId={selectedArtTrendId}
      />
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement modifier cette oeuvre ?"
        isOpenModalConfirmation={modalConfirmationModifyArtist}
        setModalConfirmation={setModalConfirmationModifyArtist}
        setStep={setStep}
        setModalValidation={setModalValidationModifyArtist}
        handleExecution={() => handleArtistModify(selectedArtistId)}
        isLoadedArtist={isLoadedArtist}
        isLoadedType={isLoadedType}
        isLoadedTechnique={isLoadedTechnique}
        isLoadedArtTrend={isLoadedArtTrend}
        handleCancel={handleCancelModifyArtist}
      />
      <ValidationModal
        textValidationModal="Oeuvre modifiée"
        isOpenModalValidation={modalValidationModifyArtist}
        setModalValidation={setModalValidationModifyArtist}
        pictureValidationModal={ValidationPicture}
      />
      <ValidationModal
        textValidationModal="Une erreur est survenue lors de la modification"
        isOpenModalValidation={modalErrorModifyArtist}
        setModalValidation={setModalErrorModifyArtist}
        pictureValidationModal={ErrorPicture}
      /> */}
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AddArtwork from "../components/AddArtwork";
import ValidationModal from "../components/ValidationModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { AddArtworkContext } from "../context/AddArtworkContext";
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
  } = useContext(AddArtworkContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalValidation, setModalValidation] = useState(false);
  const [step, setStep] = useState(1);
  const [modalError, setModalError] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setStep(1);
    setModalOpen(false);
    setModalConfirmation(false);
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
            setModalValidation(true);
          })
          .catch((error) => {
            console.error("Erreur lors de l'envoi de l'oeuvre :", error);
            setNeedToFetch(!needToFetch);
            setModalError(true);
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
              setModalError(true);
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
              setModalError(true);
              deleteError();
            });
        } else {
          checkAndPostArtistTechnique(newFormArtistTechnique, newFormArtwork);
        }
      };

      const checkAndPostArtist = (
        techniqueResponseSend,
        artTrendResponseSend,
        typeResponseSend
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
              setModalError(true);
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
        techniqueResponseSend,
        typeResponseSend
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
                techniqueResponseSend,
                artTrendResponseSend,
                typeResponseSend
              );
            })
            .catch((error) => {
              console.error(
                "Erreur lors de l'envoi du courant artistique :",
                error
              );
              setNeedToFetch(!needToFetch);
              setModalError(true);
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
              checkAndPostArtTRend(techniqueResponseSend, typeResponseSend);
            })
            .catch((error) => {
              console.error("Erreur lors de l'envoi de la technique :", error);
              setNeedToFetch(!needToFetch);
              setModalError(true);
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
            setModalError(true);
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

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          openModal();
          setNeedToFetch(!needToFetch);
        }}
      >
        Open Modal
      </button>
      <AddArtwork
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
        step={step}
        setStep={setStep}
        setModalConfirmation={setModalConfirmation}
        handleCancel={handleCancel}
      />
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement ajouter cette oeuvre ?"
        isOpenModalConfirmation={modalConfirmation}
        setModalConfirmation={setModalConfirmation}
        setStep={setStep}
        setModalValidation={setModalValidation}
        handleArtworkUpload={handleArtworkUpload}
        isLoadedArtist={isLoadedArtist}
        isLoadedType={isLoadedType}
        isLoadedTechnique={isLoadedTechnique}
        isLoadedArtTrend={isLoadedArtTrend}
        handleCancel={handleCancel}
      />
      <ValidationModal
        textValidationModal="Oeuvre ajoutée"
        isOpenModalValidation={modalValidation}
        setModalValidation={setModalValidation}
        pictureValidationModal={ValidationPicture}
      />
      <ValidationModal
        textValidationModal="Une erreur est survenue"
        isOpenModalValidation={modalError}
        setModalValidation={setModalError}
        pictureValidationModal={ErrorPicture}
      />
      ;
    </div>
  );
}

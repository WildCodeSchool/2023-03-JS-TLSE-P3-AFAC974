/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AddArtwork from "../components/AddArtwork";
// import ValidationModal from "../components/ValidationModal";
import ConfirmationModal from "../components/ConfirmationModal";
// import Validation from "../assets/Validation.png";
// import Erreur from "../assets/Erreur.png";
// import { DataProjectContext } from "../context/DataProjectContext";
import { AddArtworkContext } from "../context/AddArtworkContext";

export default function ArtworksAdministration() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [modalValidation, setModalValidation] = useState(false);
  const [step, setStep] = useState(1);

  const openModal = () => {
    setModalOpen(true);
  };

  // const {
  //   dataArtist,
  //   dataType,
  //   dataTechnique,
  //   dataArtTrend,
  //   dataArtistTechnique,
  //   dataArtTrendArtist,
  //   setNeedToFetch,
  //   needToFetch,
  // } = useContext(DataProjectContext);

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
    setFormArtTrendArtist,
    setFormArtistTechnique,
    setFormArtwork,
  } = useContext(AddArtworkContext);

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
  }, []);

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
  }, []);

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
  }, []);

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
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artisttechnique`)
      .then((res) => {
        setDataArtistTechnique(res.data);
        setIsLoadedArtistTechnique(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/arttrendartist`)
      .then((res) => {
        setDataArtTrendArtist(res.data);
        setIsLoadedArtTrendArtist(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  // console.log("formArtTrend:", formArtTrend);
  // console.log("formArtTrendArtist:", formArtTrendArtist);
  // console.log("formArtist:", formArtist);
  // console.log("formArtistTechnique:", formArtistTechnique);
  // console.log("formArtwork:", formArtwork);
  // console.log("formTechnique:", formTechnique);
  // console.log("formType:", formType);

  const handleArtworkUpload = async () => {
    const rollbackData = [];
    const rollbackDataJointure = [];
    // console.log(rollbackData);
    try {
      const postArtwork = () => {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/artworks`, formArtwork)
          .then((artworkResponse) => {
            rollbackData.push({
              endpoint: "artworks",
              id: artworkResponse.data[0].insertId,
            });
            // console.log("artwork:", artworkResponse);
          })
          .catch((error) => {
            console.error("Erreur sur l'oeuvre' :", error);
            rollbackDataJointure.map((data) =>
              axios
                .delete(
                  `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}/${data}`
                )
                .catch((errorDelete) => {
                  console.error(
                    `Erreur lors de l'annulation de ${data.endpoint}/${data.id}:`,
                    errorDelete
                  );
                })
            );

            rollbackData.map((data) =>
              axios
                .delete(
                  `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}/${
                    data.id
                  }`
                )
                .catch((errorDelete) => {
                  console.error(
                    `Erreur lors de l'annulation de ${data.endpoint}/${data.id}:`,
                    errorDelete
                  );
                })
            );
          });
      };

      const checkAndPostArtistTechnique = () => {
        if (!artisteTechniqueUpload) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/artisttechnique`,
              formArtistTechnique
            )
            .then((artistTechniqueResponse) => {
              // console.log("artistTechnique:", artistTechniqueResponse);
              rollbackDataJointure.push({
                endpoint: "artisttechnique",
                artistId: formArtwork.artistId,
                techniqueId: formArtwork.techniqueId,
              });
              postArtwork();
            })
            .catch((error) => {
              console.error("Erreur sur la technique etl'artiste :", error);
              rollbackData.map((data) =>
                axios
                  .delete(
                    `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}/${
                      data.id
                    }`
                  )
                  .catch((errorDelete) => {
                    console.error(
                      `Erreur lors de l'annulation de ${data.endpoint}/${data.id}:`,
                      errorDelete
                    );
                  })
              );
            });
        } else {
          postArtwork();
        }
      };

      const checkAndPostArtTrendArtist = () => {
        if (!artTrendArtistUpload) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/arttrendartist`,
              formArtTrendArtist
            )
            .then((artTrendArtisteResponse) => {
              // console.log("artTrendArtiste:", artTrendArtisteResponse);
              rollbackDataJointure.push({
                endpoint: "arttrendartist",
                artistId: formArtwork.artistId,
                artTrendId: formArtwork.artTrendId,
              });
              checkAndPostArtistTechnique();
            })
            .catch((error) => {
              console.error(
                "Erreur sur le courant artistique et l'artiste :",
                error
              );
              rollbackData.map((data) =>
                axios
                  .delete(
                    `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}/${
                      data.id
                    }`
                  )
                  .catch((errorDelete) => {
                    console.error(
                      `Erreur lors de l'annulation de ${data.endpoint}/${data.id}:`,
                      errorDelete
                    );
                  })
              );
            });
        } else {
          checkAndPostArtistTechnique();
        }
      };

      const checkAndPostArtist = () => {
        if (parseInt(artist, 10) === dataArtist.length + 1) {
          axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/artists`, formArtist)
            .then((artistResponse) => {
              // console.log("artist:", artistResponse);
              rollbackData.push({
                endpoint: "artists",
                id: artistResponse.data[0].insertId,
              });
              const newFormArtwork = {
                ...formArtwork,
                artistId: artistResponse.data[0].insertId,
              };
              setFormArtwork(newFormArtwork);
              formArtwork.artistId = artistResponse.data[0].insertId;
              const newFormArtTrendArtist = {
                ...formArtTrendArtist,
                artistId: artistResponse.data[0].insertId,
              };
              setFormArtTrendArtist(newFormArtTrendArtist);

              const newFormArtistTechnique = {
                ...formArtistTechnique,
                artistId: artistResponse.data[0].insertId,
              };
              setFormArtistTechnique(newFormArtistTechnique);
              formArtistTechnique.artistId = artistResponse.data[0].insertId;
              checkAndPostArtTrendArtist();
            })
            .catch((error) => {
              console.error("Erreur sur l'artiste' :", error);
              rollbackData.map((data) =>
                axios
                  .delete(
                    `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}/${
                      data.id
                    }`
                  )
                  .catch((errorDelete) => {
                    console.error(
                      `Erreur lors de l'annulation de ${data.endpoint}/${data.id}:`,
                      errorDelete
                    );
                  })
              );
            });
        } else {
          checkAndPostArtTrendArtist();
        }
      };

      const checkAndPostArtTRend = () => {
        if (parseInt(artTrend, 10) === dataArtTrend.length + 1) {
          axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/arttrend`, formArtTrend)
            .then((artTrendResponse) => {
              // console.log("artTrend:", artTrendResponse);
              rollbackData.push({
                endpoint: "arttrend",
                id: artTrendResponse.data[0].insertId,
              });
              const newFormArtTrendArtist = {
                ...formArtTrendArtist,
                artTrendId: artTrendResponse.data[0].insertId,
              };
              setFormArtTrendArtist(newFormArtTrendArtist);
              formArtTrendArtist.artTrendId = artTrendResponse.data[0].insertId;
              checkAndPostArtist();
            })
            .catch((error) => {
              console.error("Erreur sur le courant artistique :", error);
              rollbackData.map((data) =>
                axios
                  .delete(
                    `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}/${
                      data.id
                    }`
                  )
                  .catch((errorDelete) => {
                    console.error(
                      `Erreur lors de l'annulation de ${data.endpoint}/${data.id}:`,
                      errorDelete
                    );
                  })
              );
            });
        } else {
          checkAndPostArtist();
        }
      };

      const checkAndPostTechnique = () => {
        if (parseInt(technique, 10) === dataTechnique.length + 1) {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/technique`,
              formTechnique
            )
            .then((techniqueResponse) => {
              // console.log("technique:", techniqueResponse);
              rollbackData.push({
                endpoint: "technique",
                id: techniqueResponse.data[0].insertId,
              });
              const newFormArtistTechnique = {
                ...formArtistTechnique,
                techniqueId: techniqueResponse.data[0].insertId,
              };
              setFormArtistTechnique(newFormArtistTechnique);
              checkAndPostArtTRend();
            })
            .catch((error) => {
              console.error("Erreur sur la technique :", error);
              rollbackData.map((data) =>
                axios
                  .delete(
                    `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}/${
                      data.id
                    }`
                  )
                  .catch((errorDelete) => {
                    console.error(
                      `Erreur lors de l'annulation de ${data.endpoint}/${data.id}:`,
                      errorDelete
                    );
                  })
              );
            });
        } else {
          checkAndPostArtTRend();
        }
      };

      if (parseInt(type, 10) === dataType.length + 1) {
        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/type`, formType)
          .then((typeResponse) => {
            // console.log(typeResponse);
            rollbackData.push({
              endpoint: "type",
              id: typeResponse.data[0].insertId,
            });
            const newFormArtwork = {
              ...formArtwork,
              typeID: typeResponse.data[0].insertId,
            };
            setFormArtwork(newFormArtwork);
            checkAndPostTechnique();
          })
          .catch((error) => {
            console.error("Erreur sur le type :", error);
            rollbackData.map((data) =>
              axios
                .delete(
                  `${import.meta.env.VITE_BACKEND_URL}/${data.endpoint}/${
                    data.id
                  }`
                )
                .catch((errorDelete) => {
                  console.error(
                    `Erreur lors de l'annulation de ${data.endpoint}/${data.id}:`,
                    errorDelete
                  );
                })
            );
          });
      } else {
        checkAndPostTechnique();
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);

      const rollbackPromises = rollbackData.map((data) =>
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

      await Promise.all(rollbackPromises);
    }
  };

  return (
    <div>
      <button type="button" onClick={openModal}>
        Open Modal
      </button>
      <AddArtwork
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
        step={step}
        setStep={setStep}
        setModalConfirmation={setModalConfirmation}
      />
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement ajouter cette oeuvre ?"
        isOpenModalConfirmation={modalConfirmation}
        setModalConfirmation={setModalConfirmation}
        setStep={setStep}
        setModalValidation={setModalValidation}
        handleArtworkUpload={handleArtworkUpload}
      />
    </div>
  );
}

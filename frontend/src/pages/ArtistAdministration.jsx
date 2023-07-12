import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import ModifyArtist from "../components/ModifyArtist";
import ValidationModal from "../components/ValidationModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { FormArtworkArtistContext } from "../context/FormArtworkArtistContext";
import ValidationPicture from "../assets/Validation.png";
import ErrorPicture from "../assets/Erreur.png";

export default function ArtistAdministration() {
  const { formArtist, needToFetch, setNeedToFetch, setFormArtist } = useContext(
    FormArtworkArtistContext
  );

  const [modalConfirmationDeleteArtist, setModalConfirmationDeleteArtist] =
    useState(false);
  const [modalValidationDeleteArtist, setModalValidationDeleteArtist] =
    useState(false);
  const [modalErrorDeleteArtist, setModalErrorDeleteArtist] = useState(false);

  const [modalOpenModifyArtist, setModalOpenModifyArtist] = useState(false);
  const [modalConfirmationModifyArtist, setModalConfirmationModifyArtist] =
    useState(false);
  const [modalValidationModifyArtist, setModalValidationModifyArtist] =
    useState(false);
  const [modalErrorModifyArtist, setModalErrorModifyArtist] = useState(false);

  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [selectedUrlArtistId, setSelectedUrlArtistId] = useState(null);

  const openModalModifyArtist = () => {
    setModalOpenModifyArtist(true);
  };

  const handleCancelModifyArtist = () => {
    setModalOpenModifyArtist(false);
    setModalConfirmationModifyArtist(false);
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
  };

  const handleCancelDeleteArtist = () => {
    setModalConfirmationDeleteArtist(false);
  };

  const [isLoadedArtist, setIsLoadedArtist] = useState(false);
  const [dataArtist, setDataArtist] = useState(false);

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

  const handleArtistDelete = (id, url) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/artists/${id}`)
      .then(() => {
        if (url !== "") {
          const isolationNamePicture = url.match(/([^/]+).jpg$/);
          const namePicture = isolationNamePicture[1];
          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
              data: { namePicture },
            })
            .then(() => {
              setNeedToFetch(!needToFetch);
              setModalValidationDeleteArtist(true);
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la suppression sur cloudinary de l'artiste :",
                error
              );
              setNeedToFetch(!needToFetch);
              setModalErrorDeleteArtist(true);
            });
        } else {
          setNeedToFetch(!needToFetch);
          setModalValidationDeleteArtist(true);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'oeuvre :", error);
        setNeedToFetch(!needToFetch);
        setModalErrorDeleteArtist(true);
      });
  };

  const handleArtistModify = (id) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/artists/${id}`, formArtist)
      .then(() => {
        setNeedToFetch(!needToFetch);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la modification de l'oeuvre de l'oeuvre :",
          error
        );
        setNeedToFetch(!needToFetch);
        setModalErrorModifyArtist(true);
      });
  };

  return (
    <div>
      <div className="flex justify-center gap-10">
        {isLoadedArtist &&
          dataArtist.map((item) => (
            <div key={item.id} className="flex flex-col">
              <p className="border-solid border-2 border-black">
                {item.nickname}
                <img src={item.image_url_medium} alt="oeuvre" />
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedArtistId(item.id);
                  setSelectedUrlArtistId(item.image_url_medium);
                  setModalConfirmationDeleteArtist(true);
                }}
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => {
                  openModalModifyArtist();
                  setSelectedArtistId(item.id);
                  setNeedToFetch(!needToFetch);
                  setFormArtist({
                    lastname: item.lastname,
                    firstname: item.firstname,
                    nickname: item.nickname,
                    description: item.description,
                    imageUrlSmall: item.image_url_small,
                    imageUrlMedium: item.image_url_medium,
                    imageUrlLarge: item.image_url_large,
                    websiteUrl: item.website_url,
                    facebookUrl: item.facebook_url,
                    instagramUrl: item.instagram_url,
                    twitterUrl: item.twitter_url,
                  });
                }}
              >
                Modify
              </button>
            </div>
          ))}
      </div>
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement supprimer cet artiste ?"
        isOpenModalConfirmation={modalConfirmationDeleteArtist}
        setModalConfirmation={setModalConfirmationDeleteArtist}
        setModalValidation={setModalValidationDeleteArtist}
        handleExecution={() =>
          handleArtistDelete(selectedArtistId, selectedUrlArtistId)
        }
        isLoadedArtist={isLoadedArtist}
        isLoadedArtTrend
        isLoadedTechnique
        isLoadedType
        handleCancel={handleCancelDeleteArtist}
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
      <ModifyArtist
        isOpen={modalOpenModifyArtist}
        setModalOpen={setModalOpenModifyArtist}
        setModalConfirmation={setModalConfirmationModifyArtist}
        handleCancel={handleCancelModifyArtist}
        selectedArtistId={selectedArtistId}
      />
      <ConfirmationModal
        textConfirmationModal="Voulez vous réellement modifier cet artiste ?"
        isOpenModalConfirmation={modalConfirmationModifyArtist}
        setModalConfirmation={setModalConfirmationModifyArtist}
        setModalValidation={setModalValidationModifyArtist}
        handleExecution={() => handleArtistModify(selectedArtistId)}
        isLoadedArtist={isLoadedArtist}
        isLoadedArtTrend
        isLoadedTechnique
        isLoadedType
        handleCancel={handleCancelModifyArtist}
      />
      <ValidationModal
        textValidationModal="Artiste modifié"
        isOpenModalValidation={modalValidationModifyArtist}
        setModalValidation={setModalValidationModifyArtist}
        pictureValidationModal={ValidationPicture}
      />
      <ValidationModal
        textValidationModal="Une erreur est survenue lors de la modification"
        isOpenModalValidation={modalErrorModifyArtist}
        setModalValidation={setModalErrorModifyArtist}
        pictureValidationModal={ErrorPicture}
      />
    </div>
  );
}

import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ModifyArtist from "../components/ModifyArtist";
import ValidationModal from "../components/ValidationModal";
import ConfirmationModal from "../components/ConfirmationModal";
import SearchBar from "../components/SearchBar";
import SortBy from "../components/SortBy";
import { FormArtworkArtistContext } from "../context/FormArtworkArtistContext";
import ValidationPicture from "../assets/Validation.png";
import ErrorPicture from "../assets/Erreur.png";
import userSample from "../assets/user_sample.png";
import crossDelete from "../assets/crossDelete.png";
import engrenage from "../assets/Engrenage.png";
import backArrow from "../assets/back-arrow.png";
import trash from "../assets/trash.png";

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

  const handleArtistDelete = (id, url) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/artists/${id}`)
      .then(() => {
        if (url !== "") {
          const isolationNamePicture = url.match(/\/([^/]+)\.[^.]+$/);
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
            });
        } else {
          setNeedToFetch(!needToFetch);
          setModalValidationDeleteArtist(true);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'oeuvre :", error);
        setNeedToFetch(!needToFetch);
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

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists`)
      .then((res) => {
        setData(res.data);
        setIsLoadedArtist(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [needToFetch]);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filterAndSortData = () => {
    let sortedData = [...data];
    if (searchTerm) {
      sortedData = sortedData.filter((item) => {
        if (typeof item.nickname === "string") {
          return item.nickname.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    }

    if (filter === "asc") {
      sortedData.sort((a, b) => a.nickname.localeCompare(b.nickname));
    } else if (filter === "desc") {
      sortedData.sort((a, b) => b.nickname.localeCompare(a.nickname));
    }
    return sortedData;
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filteredAndSorted = filterAndSortData();
    setFilteredAndSortedData(filteredAndSorted);
  }, [data, searchTerm, filter]);

  return (
    <div className="pt-[52px]">
      <div className="pt-[20px] flex flex-col items-center">
        <div className="flex justify-center xl:justify-between items-center w-[100%]">
          <div className="flex flex-col  md:flex-row justify-between items-center gap-[16px] md:gap-[50px] p-[20px] mx-[50px] xl:my-[30px]">
            <div className="imageCircleContainer w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden border-solid border border-gray-300">
              <img
                src={userSample}
                alt="userSample"
                className="object-cover w-full h-full"
              />
            </div>
            <h1 className="text-3xl xl:text-4xl text-rose-900 font-semibold whitespace-nowrap mb-[24px] xl:mb-[0px]">
              Gestion des artistes
            </h1>
          </div>
          <Link
            to="/admin"
            className="hidden lg:flex mx-[70px] gap-1 text-xl items-center"
          >
            <img src={backArrow} alt="fleche retour" />
            <p>Retour</p>
          </Link>
        </div>
        <div className="flex flex-col-reverse xl:flex-row xl:w-[100%] items-center  xl:px-[70px]">
          <div className="flex flex-1 justify-start">
            <SearchBar
              searchTerm={searchTerm}
              handleInputChange={handleInputChange}
              placeholder="Saisir une oeuvre..."
              className="flex flex-2"
            />
          </div>
          <div className="flex flex-1">
            <SortBy handleChange={handleChange} className="flex flex-1" />
          </div>
          <div className="flex-1" />
        </div>
      </div>
      {isLoadedArtist &&
        filteredAndSortedData.map((itemArtist) => (
          <div key={itemArtist.id} className="flex flex-col lg:hidden m-[40px]">
            <img
              src={itemArtist.image_url_medium}
              alt="oeuvre"
              className="shadow-xl drop-shadow-lg"
            />
            <div className="flex mt-[20px] justify-between">
              <div>
                <h2 className="text-left ">{itemArtist.name}</h2>
                <p className="text-left mb-4 text-gray-600">
                  {itemArtist.nickname}
                </p>
              </div>
              <div className="flex items-center flex-end gap-5">
                <button
                  type="button"
                  onClick={() => {
                    openModalModifyArtist();
                    setSelectedArtistId(itemArtist.id);
                    setNeedToFetch(!needToFetch);
                    setFormArtist({
                      lastname: itemArtist.lastname,
                      firstname: itemArtist.firstname,
                      nickname: itemArtist.nickname,
                      description: itemArtist.description,
                      imageUrlSmall: itemArtist.image_url_small,
                      imageUrlMedium: itemArtist.image_url_medium,
                      imageUrlLarge: itemArtist.image_url_large,
                      websiteUrl: itemArtist.website_url,
                      facebookUrl: itemArtist.facebook_url,
                      instagramUrl: itemArtist.instagram_url,
                      twitterUrl: itemArtist.twitter_url,
                    });
                  }}
                >
                  <img src={engrenage} alt="engrenage" />
                  <p className="hidden">Modifier</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedArtistId(itemArtist.id);
                    setSelectedUrlArtistId(itemArtist.image_url_medium);
                    setModalConfirmationDeleteArtist(true);
                  }}
                >
                  <img src={crossDelete} alt="crossDelete" />
                  <p className="hidden">Supprimer</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      {isLoadedArtist &&
        filteredAndSortedData.map((itemArtist) => (
          <div
            key={itemArtist.id}
            className="hidden lg:flex lg:mt-[20px] lg:pr-[70px] lg:pl-[70px]"
          >
            <div className="flex justify-between w-[100%] border-solid border-b border-gray-300 mb-[10px] items-center">
              <div className="flex flex-col">
                <img
                  src={itemArtist.image_url_medium}
                  alt="oeuvre"
                  className="w-[20vw]"
                />
                <div className="flex mt-[20px] justify-between">
                  <div>
                    <h2 className="text-left">{itemArtist.name}</h2>
                    <p
                      className="text-left mb-4 text-gray-600"
                      key={itemArtist.id}
                    >
                      {itemArtist.nickname}
                    </p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  openModalModifyArtist();
                  setSelectedArtistId(itemArtist.id);
                  setNeedToFetch(!needToFetch);
                  setFormArtist({
                    lastname: itemArtist.lastname,
                    firstname: itemArtist.firstname,
                    nickname: itemArtist.nickname,
                    description: itemArtist.description,
                    imageUrlSmall: itemArtist.image_url_small,
                    imageUrlMedium: itemArtist.image_url_medium,
                    imageUrlLarge: itemArtist.image_url_large,
                    websiteUrl: itemArtist.website_url,
                    facebookUrl: itemArtist.facebook_url,
                    instagramUrl: itemArtist.instagram_url,
                    twitterUrl: itemArtist.twitter_url,
                  });
                }}
                className="h-fit flex items-center justify-center text-sm xl:text-base gap-[8px] px-[10px] py-[8px] border border-solid rounded-md w-[40vw] xl:w-auto "
              >
                <img
                  src={engrenage}
                  alt="engrenage"
                  className="w-[20px] h-[auto]"
                />
                <p>Modifier l'oeuvre</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedArtistId(itemArtist.id);
                  setSelectedUrlArtistId(itemArtist.image_url_medium);
                  setModalConfirmationDeleteArtist(true);
                }}
                className="h-fit flex items-center justify-center text-sm xl:text-base gap-[8px] px-[10px] py-[8px] border border-solid rounded-md w-[40vw] xl:w-auto "
              >
                <p>Supprimer</p>
                <img src={trash} alt="poubelle" className="w-[20px] h-[auto]" />
              </button>
            </div>
          </div>
        ))}
      {/* Modal for Delete */}
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
      {/* Modal for Modify */}
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

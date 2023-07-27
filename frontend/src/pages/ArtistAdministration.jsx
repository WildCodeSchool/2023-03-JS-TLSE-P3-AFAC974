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
import crossDelete from "../assets/crossDelete.png";
import engrenage from "../assets/Engrenage.png";
import backArrow from "../assets/back-arrow.png";
import trash from "../assets/trash.png";
import AuthContext from "../context/AuthContext";

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
  const { headers } = useContext(AuthContext);

  const handleCancelDeleteArtist = () => {
    setModalConfirmationDeleteArtist(false);
  };

  const [isLoadedArtist, setIsLoadedArtist] = useState(false);

  const [isLoadedArtworks, setIsLoadedArtworks] = useState(false);

  const [dataArtworks, setDataArtworks] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks`)
      .then((res) => {
        setDataArtworks(res.data);
        setIsLoadedArtworks(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [needToFetch]);

  const handleArtistDelete = (id, url) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/artists/${id}`, { headers })
      .then(() => {
        if (url !== "" && url.startsWith("https://res.cloudinary.com")) {
          const isolationNamePicture = url.match(/\/([^/]+)\.[^.]+$/);
          let namePicture = `artist-afac/${isolationNamePicture[1]}`;
          axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
              data: { namePicture },
              headers,
            })
            .then(() => {
              dataArtworks.forEach((artwork) => {
                if (artwork.artist_id === id) {
                  if (
                    artwork.image_url_medium !== "" &&
                    artwork.image_url_medium.startsWith(
                      "https://res.cloudinary.com"
                    )
                  ) {
                    const isolationNamePictureArtwork =
                      artwork.image_url_medium.match(/\/([^/]+)\.[^.]+$/);
                    namePicture = `artwork-afac/${isolationNamePictureArtwork[1]}`;
                    axios
                      .delete(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
                        data: { namePicture },
                        headers,
                      })
                      .catch((error) => {
                        console.error(
                          "Erreur lors de la suppression sur cloudinary de l'oeuvre :",
                          error
                        );
                        setNeedToFetch(!needToFetch);
                      });
                  }
                }
              });
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
              setModalErrorDeleteArtist(true);
              setNeedToFetch(!needToFetch);
            });
        } else {
          dataArtworks.forEach((artwork) => {
            if (artwork.artist_id === id) {
              if (
                artwork.image_url_medium !== "" &&
                artwork.image_url_medium.startsWith(
                  "https://res.cloudinary.com"
                )
              ) {
                const isolationNamePictureArtwork =
                  artwork.image_url_medium.match(/\/([^/]+)\.[^.]+$/);
                const namePicture = `artwork-afac/${isolationNamePictureArtwork[1]}`;
                axios
                  .delete(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
                    data: { namePicture },
                    headers,
                  })
                  .catch((error) => {
                    console.error(
                      "Erreur lors de la suppression sur cloudinary de l'oeuvre :",
                      error
                    );
                    setNeedToFetch(!needToFetch);
                  });
              }
            }
          });
          setNeedToFetch(!needToFetch);
          setModalValidationDeleteArtist(true);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'artiste :", error);
        setModalErrorDeleteArtist(true);
        setNeedToFetch(!needToFetch);
      });
  };

  const handleArtistModify = (id) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/artists/${id}`, formArtist, {
        headers,
      })
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

  const [adminData, setAdminData] = useState(null);
  const [isLoadedAdminData, setIsLoadedAdminData] = useState(false);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/findadmin`)
      .then((response) => {
        setAdminData(response.data[0]);
        setIsLoadedAdminData(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {isLoadedArtist && isLoadedAdminData && isLoadedArtworks && (
        <div className="pt-[52px]">
          <div className="pt-[20px] flex flex-col items-center">
            <div className="flex justify-center xl:justify-between items-center w-[100%]">
              <div className="flex flex-col  md:flex-row justify-between items-center gap-[16px] md:gap-[50px] p-[20px] mx-[50px] xl:my-[30px]">
                <div className=" w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden">
                  {adminData && adminData.length > 0 && adminData[0].image ? (
                    <img
                      src={adminData[0].image}
                      alt="profil pic"
                      className="object-cover h-[100%] w-[100%]"
                    />
                  ) : (
                    <div className="bg-[#7F253E] min-w-[120px] min-h-[120px] w-[20vw] h-[20vw] md:w-[15vw] md:h-[15vw] lg:w-[12vw] lg:h-[12vw] xl:w-[12vw] xl:h-[12vw] object-cover rounded-full flex items-center justify-center">
                      <h1 className="text-white text-[50px] xl:text-[70px]">
                        {adminData[0].firstname.charAt(0)}
                        {adminData[0].lastname.charAt(0)}
                      </h1>
                    </div>
                  )}
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
                <SortBy handleChange={handleChange} className="flex flex-1" />
              </div>
              <div className="flex flex-1 justify-center">
                <SearchBar
                  searchTerm={searchTerm}
                  handleInputChange={handleInputChange}
                  placeholder="Saisir un artiste..."
                  className="flex flex-2"
                />
              </div>
              <div className="flex-1" />
            </div>
          </div>
          {isLoadedArtist &&
            filteredAndSortedData.map((itemArtist) => (
              <div
                key={itemArtist.id}
                className="flex flex-col lg:hidden m-[40px] items-center"
              >
                <div>
                  {itemArtist.image_url_medium ? (
                    <img
                      src={itemArtist.image_url_medium}
                      alt="artist"
                      className="shadow-xl drop-shadow-lg object-cover max-h-[40vw] w-auto"
                    />
                  ) : (
                    <div className="bg-[#7F253E] w-[100%] h-[100%] object-cover rounded-full flex items-center justify-center">
                      <h1 className="text-white text-[30px]">
                        {itemArtist.firstname.charAt(0)}
                        {itemArtist.lastname.charAt(0)}
                      </h1>
                    </div>
                  )}
                </div>
                <div className="flex mt-[20px] justify-between gap-[15px]">
                  <div>
                    <h2 className="text-left ">{itemArtist.name}</h2>
                    <p className="text-left mb-4 text-gray-600">
                      {itemArtist.nickname}
                    </p>
                  </div>
                  <div className="flex items-center flex-end gap-5 mb-4">
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
                      <img
                        src={engrenage}
                        alt="engrenage"
                        className="max-w-fit"
                      />
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
                      <img
                        src={crossDelete}
                        alt="crossDelete"
                        className="max-w-fit"
                      />
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
                    <div className="imageCircleContainer w-[110px] h-[110px] border border-0.5 border-gray-300 border-solid  rounded-full overflow-hidden">
                      {itemArtist.image_url_medium ? (
                        <img
                          src={itemArtist.image_url_medium}
                          alt="artist"
                          className="object-cover w-[100%] h-[100%]"
                        />
                      ) : (
                        <div className="bg-[#7F253E] w-[100%] h-[100%] object-cover rounded-full flex items-center justify-center">
                          <h1 className="text-white text-[30px]">
                            {itemArtist.firstname.charAt(0)}
                            {itemArtist.lastname.charAt(0)}
                          </h1>
                        </div>
                      )}
                    </div>
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
                    <p>Modifier l'artiste</p>
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
                    <img
                      src={trash}
                      alt="poubelle"
                      className="w-[20px] h-[auto]"
                    />
                  </button>
                </div>
              </div>
            ))}
          {/* Modal for Delete */}
          <ConfirmationModal
            textConfirmationModal="Voulez vous réellement supprimer cet artiste ?"
            additionnalText="Attention cela supprimera également les oeuvres associées"
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
      )}
    </div>
  );
}

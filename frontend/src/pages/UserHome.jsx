import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import settings from "../assets/settings.png";
import ValidationModal from "../components/ValidationModal";
import ModifyProfilePic from "../components/ModifyProfilePic";
import AuthContext from "../context/AuthContext";
import ValidationPicture from "../assets/Validation.png";
import ErrorPicture from "../assets/Erreur.png";

export default function UserHome() {
  const [artworksToMap, setArtworksToMap] = useState([]);
  const [artistsData, setArtistsData] = useState(null);
  const [isLoadedArtworksToMap, setIsLoadedArtworksToMap] = useState(false);
  const [isLoadedArtistsData, setIsLoadedArtistsData] = useState(false);
  const [entities, setEntities] = useState([]);
  const [modifyProfileModalOpened, setModifyProfileModalOpened] =
    useState(false);
  const [modalValidationModifyUser, setModalValidationModifyUser] =
    useState(false);
  const [modalErrorModifyUser, setModalErrorModifyUser] = useState(false);
  const {
    userId,
    loggedUserData,
    setLoggedUserData,
    setIsLoadedUser,
    isLoadedUser,
    headers,
  } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}/artworks/favorites`,
        {
          headers,
        }
      )
      .then((response) => {
        const favData = response.data;
        const fetchArtworksPromises = favData.map((fav) =>
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/artworks/${fav.artwork_id}`
          )
        );
        Promise.all(fetchArtworksPromises)
          .then((artworksResponses) => {
            const artworksData = artworksResponses.map((res) => res.data[0]);
            setArtworksToMap(artworksData);
            setIsLoadedArtworksToMap(true);
          })
          .catch((error) => {
            console.error(error);
            setIsLoadedArtworksToMap(true);
          });
      })
      .catch((error) => {
        console.error(error);
        setIsLoadedArtworksToMap(true);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/entities`)
      .then((response) => {
        setEntities(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists`)
      .then((response) => {
        setArtistsData(response.data);
        setIsLoadedArtistsData(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/loggedUser/${userId}`)
      .then((response) => {
        setLoggedUserData(response.data);
        setIsLoadedUser(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const disableRightClick = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {isLoadedArtistsData && isLoadedArtworksToMap && isLoadedUser && (
        <section className="w-full overflow-hidden">
          <div className="w-full items-center flex flex-col xl:flex-row gap-5 mt-[80px]  xl:p-5">
            {loggedUserData &&
            loggedUserData.length > 0 &&
            loggedUserData[0].image ? (
              <button
                type="button"
                onClick={() => {
                  setModifyProfileModalOpened(true);
                }}
              >
                <img
                  src={loggedUserData[0].image}
                  alt="profil pic"
                  className="rounded-full object-cover xl:w-[12vw] xl:h-[12vw] w-[35vw] h-[35vw] max-w-[150px] max-h-[150px] "
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setModifyProfileModalOpened(true);
                }}
              >
                <div className="bg-[#7F253E] min-w-[120px] min-h-[120px] w-[20vw] h-[20vw] max-w-[150px] max-h-[150px] md:w-[15vw] md:h-[15vw] lg:w-[100px] lg:h-[100px] object-cover rounded-full flex items-center justify-center">
                  <h1 className="text-white text-[50px] xl:text-[55px]">
                    {loggedUserData[0].firstname.charAt(0)}
                    {loggedUserData[0].lastname.charAt(0)}
                  </h1>
                </div>
              </button>
            )}
            <h1 className="text-2xl text-black font-bold">
              {loggedUserData[0].pseudo}
            </h1>
          </div>
          <div className="  flex justify-between mx-4">
            <h2 className="text-4xl text-left font-bold hidden xl:block">
              INFORMATIONS PERSONNELLES
            </h2>
            <Link to="/settings" className="items-center xl:block hidden">
              <img src={settings} alt="settings button" className=" mr-5" />
            </Link>
            <h2 className="text-4xl text-left font-bold xl:hidden mt-4">
              INFORMATIONS
            </h2>
          </div>
          <section className="mx-[20px]">
            {loggedUserData &&
              loggedUserData.length > 0 &&
              loggedUserData.map((data) => {
                return (
                  <div
                    key={data.email}
                    className=" flex flex-col xl:flex-row flex-wrap w-full sm:w-[80%] gap-5 mt-9"
                  >
                    <section className="flex flex-col w-full xl:w-[81.9%] gap-2">
                      <h3 className="text-left">Etablissement</h3>
                      <div className="w-full p-1 rounded-lg text-left border-2 border-gray-300 border-solid h-[36px]">
                        <p className="text-left">
                          {entities.map((entity) =>
                            data.entity_id === entity.id ? entity.name : null
                          )}
                        </p>
                      </div>
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Adresse Email :</h3>
                      <div className="w-full p-1  rounded-lg text-left border-2 border-gray-300 border-solid">
                        <p>{data.email}</p>
                      </div>
                    </section>
                    <section className="flex flex-col xl:w-[40%]  w-full   gap-2">
                      <h3 className="text-left">Pseudo</h3>
                      <div className="w-full p-1 rounded-lg text-left border-2 border-gray-300 border-solid">
                        <p>{data.pseudo}</p>
                      </div>
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Prénom</h3>
                      <div className="w-full p-1 rounded-lg text-left border-2 border-gray-300  border-solid">
                        <p>{data.firstname}</p>
                      </div>
                    </section>
                    <section className="flex flex-col xl:w-[40%]  w-full  gap-2">
                      <h3 className="text-left">Nom :</h3>
                      <div className="w-full p-1 rounded-lg text-left border-2 border-gray-300  border-solid">
                        <p>{data.lastname}</p>
                      </div>
                    </section>
                  </div>
                );
              })}
          </section>
          <section className="flex flex-col gap-5">
            <section className="w-full flex flex-col mt-8 sm:mt-2 xl:p-10 gap-10">
              <div className="flex w-full justify-between items-center mb-[32px] ">
                <h2 className="font-bold text-xl xl:text-3xl ml-3 xl:ml-0">
                  Vos coups de coeur
                </h2>
                <Link to={`/user/${userId}/favorite`} className="items-center">
                  <p className="xl:block hidden">Gérer les favoris</p>
                  <img
                    src={settings}
                    alt="settings button"
                    className="xl:hidden mr-5"
                  />
                </Link>
              </div>
              <section className="w-full hidden xl:grid xl:grid-cols-4 xl: gap-5">
                {artworksToMap &&
                  artworksToMap.length > 0 &&
                  artworksToMap.slice(0, 4).map((artwork) => (
                    <div className="pb-4 flex flex-col" key={artwork.id}>
                      <div>
                        <Link to={`/gallery/${artwork.id}`}>
                          <img
                            src={artwork.image_url_medium}
                            alt={`art${artwork.id}`}
                            className="flex justify-center shadow-xl mb-2"
                            onContextMenu={disableRightClick}
                          />
                        </Link>
                        <div className="flex flex-row justify-between h-[100%]">
                          <div className="flex flex-col">
                            <p className="text-left">{`${artwork.name}, ${artwork.year}`}</p>
                            {artistsData.map((artist) => {
                              if (artist.id === artwork.artist_id) {
                                return (
                                  <p
                                    className="text-left mb-4 text-gray-600"
                                    key={artist.id}
                                  >
                                    {artist.nickname}
                                  </p>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </section>
            </section>
          </section>
          <ModifyProfilePic
            modifyProfileModalOpened={modifyProfileModalOpened}
            setModifyProfileModalOpened={setModifyProfileModalOpened}
            setModalValidationModifyUser={setModalValidationModifyUser}
            setModalValidation={setModalErrorModifyUser}
          />
          <ValidationModal
            textValidationModal="Modifications prises en compte"
            isOpenModalValidation={modalValidationModifyUser}
            setModalValidation={setModalValidationModifyUser}
            pictureValidationModal={ValidationPicture}
          />
          <ValidationModal
            textValidationModal="Une erreur est survenue lors de la modification"
            isOpenModalValidation={modalErrorModifyUser}
            setModalValidation={setModalErrorModifyUser}
            pictureValidationModal={ErrorPicture}
          />
        </section>
      )}
    </div>
  );
}

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import settings from "../assets/settings.png";
import AuthContext from "../context/AuthContext";

export default function UserHome() {
  const [artworksToMap, setArtworksToMap] = useState([]);
  const [artistsData, setArtistsData] = useState(null);
  const [isLoadedArtworksToMap, setIsLoadedArtworksToMap] = useState(false);
  const [isLoadedArtistsData, setIsLoadedArtistsData] = useState(false);
  const [loggedUserData, setLoggedUserData] = useState(null);
  const { userId } = useContext(AuthContext);
  const [isLoggin, setIsLoggin] = useState(false);
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}/artworks/favorites`
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
      .get(`${import.meta.env.VITE_BACKEND_URL}/logggedUser/${userId}`)
      .then((response) => {
        setLoggedUserData(response.data);
        setIsLoggin(true);
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
      {isLoadedArtistsData && isLoadedArtworksToMap && isLoggin && (
        <section className="w-full overflow-hidden">
          <div className="w-full items-center flex flex-col xl:flex-row gap-10 mt-[100px] p-4 xl:p-10">
            {loggedUserData &&
            loggedUserData.length > 0 &&
            loggedUserData[0].image ? (
              <img
                src={loggedUserData[0].image}
                alt="profil pic"
                className="rounded-full object-cover xl:w-[12vw] xl:h-[12vw] w-[35vw] h-[35vw]"
              />
            ) : (
              <div className="bg-[#7F253E] min-w-[120px] min-h-[120px] w-[20vw] h-[20vw] md:w-[15vw] md:h-[15vw] lg:w-[12vw] lg:h-[12vw] xl:w-[12vw] xl:h-[12vw] object-cover rounded-full flex items-center justify-center">
                <h1 className="text-white text-[50px] xl:text-[70px]">
                  {loggedUserData[0].firstname.charAt(0)}
                  {loggedUserData[0].lastname.charAt(0)}
                </h1>
              </div>
            )}
            <h1 className="text-2xl text-black font-bold">
              {loggedUserData[0].pseudo}
            </h1>
          </div>
          <div className="w-full p-4 mt-3 flex justify-between xl:p-10">
            <h2 className="text-4xl text-left font-bold hidden xl:block">
              INFORMATIONS PERSONELLES
            </h2>
            <Link to="/settings" className="items-center xl:block hidden">
              <img src={settings} alt="settings button" className=" mr-5" />
            </Link>
            <h2 className="text-4xl text-left font-bold xl:hidden">
              INFORMATIONS
            </h2>
          </div>
          <section className="w-full p-4 xl:p-10">
            {loggedUserData &&
              loggedUserData.length > 0 &&
              loggedUserData.map((data) => {
                return (
                  <div
                    key={data.email}
                    className=" flex flex-col xl:flex-row flex-wrap w-[80%] gap-5 mt-9"
                  >
                    <section className="flex flex-col w-full xl:w-[81.9%] gap-2">
                      <h3 className="text-left">Etablissement</h3>
                      <div className="w-full p-1 rounded-lg text-left border-2 border-gray-300 border-solid h-[36px]">
                        <p>
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
            <section className="w-full flex flex-col mt-10 xl:p-10 gap-10">
              <div className="flex w-full justify-between items-center ">
                <h2 className="font-bold text-xl xl:text-3xl ml-3 xl:ml-0">
                  Vos coups de coeur
                </h2>
                <Link to="/user/:userId/favorite" className="items-center">
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
        </section>
      )}
    </div>
  );
}

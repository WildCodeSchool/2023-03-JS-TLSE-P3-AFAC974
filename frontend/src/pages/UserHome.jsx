import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import settings from "../assets/settings.png";
import AuthContext from "../context/AuthContext";

export default function UserHome() {
  const [artworksData, setArtworksData] = useState(null);
  const [artistsData, setArtistsData] = useState(null);
  const [isLoadedArtworksData, setIsLoadedArtworksData] = useState(false);
  const [isLoadedArtistsData, setIsLoadedArtistsData] = useState(false);
  const [logedUserData, setLogedUserData] = useState(null);
  const { userId } = useContext(AuthContext);
  const [isLoggin, setIsLoggin] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks`)
      .then((response) => {
        setArtworksData(response.data);
        setIsLoadedArtworksData(true);
      })
      .catch((error) => {
        console.error(error);
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
      .get(`${import.meta.env.VITE_BACKEND_URL}/loggeduser/${userId}`)
      .then((response) => {
        setLogedUserData(response.data);
        setIsLoggin(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const disableRightClick = (e) => {
    e.preventDefault();
  };

  // console.log(logedUserData);

  return (
    <div>
      {isLoadedArtistsData && isLoadedArtworksData && isLoggin && (
        <section className="w-full overflow-hidden">
          <div className="w-full items-center flex flex-col xl:flex-row gap-10 mt-[100px] p-4">
            {logedUserData && logedUserData.length > 0 && (
              <img
                src={logedUserData.image}
                alt="profil pic"
                className="xl:w-[12dvw] xl:h-[25dvh] w-[35dvw] h-[16dvh] objet-cover rounded-full"
              />
            )}
            <h1 className="text-2xl text-black font-bold">
              {logedUserData[0].pseudo}
            </h1>
          </div>
          <div className="w-full p-4 mt-3 flex justify-between">
            <h2 className="text-4xl text-left font-bold hidden xl:block">
              INFORMATIONS PERSONELLES
            </h2>
            <Link to="/" className="items-center xl:block hidden">
              <img src={settings} alt="settings button" className=" mr-5" />
            </Link>
            <h2 className="text-4xl text-left font-bold xl:hidden">
              INFORMATIONS
            </h2>
          </div>
          <section className="w-full p-4">
            {logedUserData &&
              logedUserData.length > 0 &&
              logedUserData.map((data) => {
                return (
                  <div
                    key={data.id}
                    className=" flex flex-col xl:flex-row flex-wrap w-[80%] gap-5 mt-9"
                  >
                    <section className="flex flex-col w-full xl:w-[81.9%] gap-2">
                      <h3 className="text-left">Etablissement</h3>
                      <div className="w-full p-1 rounded-lg text-left border-2 border-gray-300 border-solid">
                        <p>{data.entity_id}</p>
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
            <section
              className="w-full flex flex-col mt-10 xl:p-10 gap-10
      "
            >
              <div className="flex w-full justify-between items-center ">
                <h2 className="font-bold text-xl xl:text-3xl ml-3 xl:ml-0">
                  Vos coups de coeur
                </h2>
                <Link to="/user/favorites" className="items-center">
                  <p className="xl:block hidden">Gérer les favoris</p>
                  <img
                    src={settings}
                    alt="settings button"
                    className="xl:hidden mr-5"
                  />
                </Link>
              </div>
              <section className="w-full hidden xl:flex gap-5">
                {artworksData &&
                  artworksData.length > 0 &&
                  artworksData.slice(0, 4).map((artwork) => (
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

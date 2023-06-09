import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import settings from "../assets/settings.png";

export default function AdminHome() {
  const [adminData, setAdminData] = useState(null);
  const [artworksData, setArtworksData] = useState(null);
  const [artistsData, setArtistsData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/findadmin`)
      .then((response) => {
        setAdminData(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks`)
      .then((response) => {
        setArtworksData(response.data);
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/findusers`)
      .then((response) => {
        setUsersData(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <section className="w-full overflow-hidden">
      <div className="w-full items-center flex flex-col xl:flex-row gap-10 mt-[100px] p-4">
        {adminData && adminData.length > 0 && (
          <img
            src={adminData[0].image}
            alt="profil pic"
            className="xl:w-[12dvw] xl:h-[25dvh] w-[35dvw] h-[16dvh] objet-cover rounded-full"
          />
        )}
        <h1 className="text-2xl text-black font-bold">ADMINISTRATEUR</h1>
      </div>
      <div className="w-full p-4 mt-3 flex justify-between">
        <h2 className="text-4xl text-left font-bold hidden xl:block">
          INFORMATIONS PERSONELLES
        </h2>
        <Link to="/" className="items-center xl:block hidden">
          <img src={settings} alt="settings button" className=" mr-5" />
        </Link>
        <h2 className="text-4xl text-left font-bold xl:hidden">INFORMATIONS</h2>
      </div>
      <section className="w-full p-4">
        {adminData &&
          adminData.length > 0 &&
          adminData.map((data) => {
            return (
              <div
                key={data.id}
                className=" flex flex-col xl:flex-row flex-wrap w-[80%] gap-5 mt-9"
              >
                <section className="flex flex-col w-full xl:w-[81.9%] gap-2">
                  <h3 className="text-left">Etablissement</h3>
                  <div className="w-full p-1 rounded-lg text-left border-2 border-gray-300 border-solid">
                    <p>{data.email}</p>
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
              GESTION DES OEUVRES
            </h2>
            <Link to="/admin/artworks" className="items-center">
              <p className="xl:block hidden">Gérer les oeuvres</p>
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
              artworksData.slice(0, 4).map((data) => {
                const artistIdentity = artistsData.find(
                  (artist) => artist.id === data.artist_id
                );
                return (
                  <div className="w-1/3 flex-col gap-3" key={data.id}>
                    <img src={data.image_url_medium} alt={data.name} />
                    <div className="flex justify-between gap-2  text-lg">
                      <h3 className="font-bold">{data.name}</h3>
                      <p>{data.year}</p>
                    </div>
                    <h2 className="text-left">
                      {artistIdentity
                        ? `${artistIdentity.firstname} ${artistIdentity.lastname}`
                        : ""}
                    </h2>
                  </div>
                );
              })}
          </section>
        </section>
        <section className=" w-full flex flex-col xl:mt-10 xl:p-10 gap-10">
          <div className="flex justify-between w-full xl:mb-7">
            <h2 className="font-bold text-xl xl:text-3xl ml-3 xl:ml-0">
              GESTION DES ARTISTES
            </h2>
            <Link to="/admin/artists">
              <p className="xl:block hidden">Gérer les artistes</p>
              <img
                src={settings}
                alt="settings button"
                className="xl:hidden mr-5"
              />
            </Link>
          </div>
          <section
            className="ml-20 hidden xl:flex flex-wrap gap-x-[90px] justify-center gap-y-10 
         w-full"
          >
            {artistsData &&
              artistsData.length > 0 &&
              artistsData.map((data) => (
                <>
                  <div className="w-[20%] flex items-center gap-3">
                    <img
                      src={data.image_url_medium}
                      alt={data.firstname}
                      className="w-[5dvw] h-[5dvw] rounded-full object-cover"
                    />
                    <p>{data.firstname}</p>
                  </div>
                  <div className="w-[20%] flex items-center gap-3">
                    <img
                      src={data.image_url_medium}
                      alt={data.firstname}
                      className="w-[5dvw] h-[5dvw] rounded-full object-cover"
                    />
                    <p>{data.firstname}</p>
                  </div>
                  <div className="w-[20%] flex items-center gap-3">
                    <img
                      src={data.image_url_medium}
                      alt={data.firstname}
                      className="w-[5dvw] h-[5dvw] rounded-full object-cover"
                    />
                    <p>{data.firstname}</p>
                  </div>
                  <div className="w-[20%] flex items-center gap-3">
                    <img
                      src={data.image_url_medium}
                      alt={data.firstname}
                      className="w-[5dvw] h-[5dvw] rounded-full object-cover"
                    />
                    <p>{data.firstname}</p>
                  </div>
                </>
              ))}
          </section>
        </section>
        <section className="w-full flex flex-col xl:mt-10 xl:p-10 gap-10">
          <div className="flex justify-between w-full mb-7">
            <h2 className="font-bold text-xl xl:text-3xl ml-3 xl:ml-0">
              GESTION DES UTILISATEURS
            </h2>
            <Link to="/admin/users">
              <p className="xl:block hidden">Gérer les utilisateurs</p>
              <img
                src={settings}
                alt="settings button"
                className="xl:hidden mr-5"
              />
            </Link>
          </div>
          <section
            className=" ml-20 hidden xl:flex flex-wrap gap-x-[90px] justify-center gap-y-10 
         w-full "
          >
            {usersData &&
              usersData.length > 0 &&
              usersData.slice(0, 4).map((data) => (
                <>
                  <div
                    key={data.id}
                    className="w-[20%] flex items-center gap-3"
                  >
                    <img
                      src={data.image}
                      alt={data.firstname}
                      className="w-[5dvw] h-[5dvw] rounded-full object-cover"
                    />
                    <h2>{data.lastname}</h2>
                  </div>
                  <div
                    key={data.id}
                    className="w-[20%] flex items-center gap-3"
                  >
                    <img
                      src={data.image}
                      alt={data.firstname}
                      className="w-[5dvw] h-[5dvw] rounded-full object-cover"
                    />
                    <h2>{data.lastname}</h2>
                  </div>
                  <div
                    key={data.id}
                    className="w-[20%] flex items-center gap-3"
                  >
                    <img
                      src={data.image}
                      alt={data.firstname}
                      className="w-[5dvw] h-[5dvw] rounded-full object-cover"
                    />
                    <h2>{data.lastname}</h2>
                  </div>
                </>
              ))}
          </section>
        </section>
      </section>
    </section>
  );
}

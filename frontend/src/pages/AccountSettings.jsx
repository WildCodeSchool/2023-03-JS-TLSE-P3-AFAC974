import React, { useEffect, useContext } from "react";
import axios from "axios";
import RedButton from "../components/RedButton";
import AuthContext from "../context/AuthContext";

export default function AccountSettings() {
  const {
    userId,
    loggedUserData,
    setLoggedUserData,
    setIsLoadedUser,
    isLoadedUser,
  } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/loggeduser/${userId}`)
      .then((response) => {
        setLoggedUserData(response.data);
        setIsLoadedUser(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="ml-7  ">
      {isLoadedUser && (
        <section className="w-full overflow-hidden flex flex-col gap-10 xl:gap-0">
          <div className="w-full items-center flex flex-col xl:flex-row xl:justify-between gap-10 mt-[100px] p-4 xl:p-0">
            <div className="flex flex-col xl:flex-row xl:items-center gap-5">
              {loggedUserData && loggedUserData.length > 0 && (
                <img
                  src={loggedUserData[0].image}
                  alt="profil pic"
                  className="xl:w-[12dvw] xl:h-[25dvh] block mx-auto  w-[35dvw] h-[16dvh] objet-cover rounded-full"
                />
              )}
              <h1 className="text-2xl text-black font-bold">ADMINISTRATEUR</h1>
            </div>
            <div className="w-[15%] h-11  hidden xl:block xl:mr-7 ">
              <RedButton
                text="Supprimer le compte"
                type="button"
                // onClick={handleLogOut}
              />
            </div>
          </div>
          <section className="w-full xl:p-4">
            {loggedUserData &&
              loggedUserData.length > 0 &&
              loggedUserData.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="flex flex-col xl:flex-row flex-wrap w-[90%] xl:w-[80%] gap-5 mt-9"
                  >
                    <h2 className="xl:text-4xl text-2xl text-left font-bold">
                      Modifications
                    </h2>
                    <section className="flex flex-col w-full xl:w-[81.9%] gap-2">
                      <h3 className="text-left">Etablissement</h3>
                      <input
                        className="w-full p-2 rounded-lg text-left border-2 border-gray-300 border-solid "
                        type="text"
                        placeholder={data.email}
                      />
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Adresse Email :</h3>
                      <input
                        type="text"
                        className="w-full p-2 rounded-lg text-left border-2 border-gray-300 border-solid"
                        placeholder={data.email}
                      />
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Pseudo</h3>
                      <input
                        type="text"
                        className="w-full p-2 rounded-lg text-left border-2 border-gray-300 border-solid"
                        placeholder={data.pseudo}
                      />
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Prénom</h3>
                      <input
                        type="text"
                        className="w-full p-2 rounded-lg text-left border-2 border-gray-300  border-solid"
                        placeholder={data.firstname}
                      />
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Nom :</h3>
                      <input
                        type="text"
                        className="w-full p-2 rounded-lg text-left border-2 border-gray-300  border-solid"
                        placeholder={data.lastname}
                      />
                    </section>
                  </div>
                );
              })}
          </section>
          <div className="xl:w-[15%] w-full mx-auto h-11 xl:ml-20 mt-5 block">
            <RedButton
              text="Enregistrer les modifications"
              type="button"
              // onClick={handleLogOut}
            />
          </div>
          <section className="flex flex-col mt-10 xl:p-4 ">
            <div className="flex flex-col xl:flex-row flex-wrap w-[90%] xl:w-[80%] gap-5 xl:mt-9 ">
              <h2 className="xl:text-4xl text-2xl text-left font-bold">
                Mot de Passe
              </h2>
              <div className="flex flex-col xl:flex-row w-[80%] gap-5 xl:mt-9">
                <section className="flex flex-col xl:w-[40%] w-full gap-2">
                  <h3 className="text-left">Modifier mon mot de passe</h3>
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg text-left border-2 border-gray-300  border-solid"
                    placeholder="****"
                  />
                </section>
                <section className="flex flex-col xl:w-[40%] w-full gap-2">
                  <h3 className="text-left">
                    Confirmer mon nouveau mot de passe
                  </h3>
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg text-left border-2 border-gray-300 border-solid"
                    placeholder="****"
                  />
                </section>
              </div>
            </div>
          </section>
          <div className="xl:w-[15%] w-full h-11 xl:ml-20 mt-5 xl:mb-16 block">
            <RedButton
              text="Modifier le mot de passe"
              type="button"
              // onClick={handleLogOut}
            />
          </div>
          <section className="flex flex-col xl:hidden">
            <h2 className="xl:text-4xl text-2xl text-left font-bold">
              Suppression du compte
            </h2>
            <div className="xl:w-[15%] w-full h-11 xl:ml-20 mt-5 xl:mb-16 block">
              <RedButton
                text="Supprimer le compte"
                type="button"
                // onClick={handleLogOut}
              />
            </div>
          </section>
        </section>
      )}
    </div>
  );
}

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
    <div>
      {isLoadedUser && (
        <section className="w-full overflow-hidden">
          <div className="w-full items-center flex flex-col xl:flex-row xl:justify-between gap-10 mt-[100px] p-4">
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
            <div className="w-[15%] h-10 hidden xl:block">
              <RedButton
                text="Supprimer le compte"
                type="button"
                // onClick={handleLogOut}
              />
            </div>
          </div>
          <section className="w-full p-4">
            {loggedUserData &&
              loggedUserData.length > 0 &&
              loggedUserData.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="flex flex-col xl:flex-row flex-wrap w-[80%] gap-5 mt-9"
                  >
                    <h2 className="xl:text-4xl text-3xl text-left font-bold">
                      Modifications
                    </h2>
                    <section className="flex flex-col w-full xl:w-[81.9%] gap-2">
                      <h3 className="text-left">Etablissement</h3>
                      <input
                        className="w-full p-1 rounded-lg text-left border-2 border-gray-300 border-solid"
                        type="text"
                        placeholder={data.email}
                      />
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Adresse Email :</h3>
                      <input
                        type="text"
                        className="w-full p-1 rounded-lg text-left border-2 border-gray-300 border-solid"
                        placeholder={data.email}
                      />
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Pseudo</h3>
                      <input
                        type="text"
                        className="w-full p-1 rounded-lg text-left border-2 border-gray-300 border-solid"
                        placeholder={data.pseudo}
                      />
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Prénom</h3>
                      <input
                        type="text"
                        className="w-full p-1 rounded-lg text-left border-2 border-gray-300  border-solid"
                        placeholder={data.firstname}
                      />
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Nom :</h3>
                      <input
                        type="text"
                        className="w-full p-1 rounded-lg text-left border-2 border-gray-300  border-solid"
                        placeholder={data.lastname}
                      />
                    </section>
                  </div>
                );
              })}
          </section>
          <div className="xl:w-[15%] w-[60%] h-10 xl:ml-28 xl:mt-1 block">
            <RedButton
              text="Enregistrer les modifications"
              type="button"
              // onClick={handleLogOut}
            />
          </div>
          <section className="flex flex-col mt-5">
            <h2 className="xl:text-4xl text-3xl text-left font-bold">
              Mot de Passe
            </h2>
            <div className="flex w-[50%]">
              <section className="flex flex-col xl:w-[40%] w-full gap-2">
                <h3 className="text-left">Nom :</h3>
                <input
                  type="text"
                  className="w-full p-1 rounded-lg text-left border-2 border-gray-300  border-solid"
                  placeholder="****"
                />
              </section>
              <section className="flex flex-col xl:w-[40%] w-full gap-2">
                <h3 className="text-left">Adresse Email :</h3>
                <input
                  type="text"
                  className="w-full p-1 rounded-lg text-left border-2 border-gray-300 border-solid"
                  placeholder="****"
                />
              </section>
            </div>
            <div className="xl:w-[15%] w-[60%] h-10 xl:ml-28 xl:mt-1 block">
              <RedButton
                text="Enregistrer les modifications"
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import RedButton from "../components/RedButton";

export default function AccountSettings() {
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
      {isLoadedAdminData && (
        <section className="w-full overflow-hidden">
          <div className="w-full items-center flex flex-col xl:flex-row xl:justify-between gap-10 mt-[100px] p-4">
            <div className="flex flex-col xl:flex-row xl:items-center gap-5">
              {adminData && adminData.length > 0 && (
                <img
                  src={adminData[0].image}
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
            {adminData &&
              adminData.length > 0 &&
              adminData.map((data) => {
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
        </section>
      )}
    </div>
  );
}

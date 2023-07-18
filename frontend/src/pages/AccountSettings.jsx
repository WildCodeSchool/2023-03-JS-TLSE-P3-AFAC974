import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import RedButton from "../components/RedButton";
import GreyButton from "../components/GreyButton";
import AuthContext from "../context/AuthContext";
import Cookies from "js-cookie";

export default function AccountSettings() {
  const {
    userId,
    loggedUserData,
    setLoggedUserData,
    setIsLoadedUser,
    isLoadedUser,
  } = useContext(AuthContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };
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

  const handleDeleteUser = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setIsUserDeleted(true);
          if (isUserDeleted) {
            Cookies.remove("jwt");
            Cookies.remove("role");
            setIsDeleteModalOpen(false);
            window.location.href = "/";
          }
        } else {
          console.error("Erreur lors de la suppression");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    document.body.classList.add("disable-scroll");
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    document.body.classList.remove("disable-scroll");
  };

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
                onClick={handleOpenDeleteModal}
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
            <RedButton text="Enregistrer les modifications" type="button" />
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
            <RedButton text="Modifier le mot de passe" type="button" />
          </div>
          <section className="flex flex-col xl:hidden">
            <h2 className="xl:text-4xl text-2xl text-left font-bold">
              Suppression du compte
            </h2>
            <div className="xl:w-[15%] w-full h-11 xl:ml-20 mt-5 xl:mb-16 block">
              <RedButton
                text="Supprimer le compte"
                type="button"
                onClick={handleOpenDeleteModal}
              />
            </div>
            <Modal
              isOpen={isDeleteModalOpen}
              style={customModalStyles}
              className=" w-[95%] fixed top-[45%] xl:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex"
              contentLabel="Modal"
            >
              <div className="bg-white w-[25%] rounded-xl text-center flex flex-col gap-6 mx-auto p-5">
                <h2 className="text-xl">
                  Etes vous sur de vouloir supprimer le compte ?
                </h2>
                <div className="h-11">
                  <RedButton
                    text="Oui,supprimer"
                    type="button"
                    onClick={handleDeleteUser}
                  />
                </div>
                <div className="h-11">
                  <GreyButton
                    text="Non,conserver"
                    type="button"
                    onClick={handleCloseDeleteModal}
                  />
                </div>
              </div>
            </Modal>
          </section>
        </section>
      )}
    </div>
  );
}

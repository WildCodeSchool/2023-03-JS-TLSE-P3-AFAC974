import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Cookies from "js-cookie";
import ValidationModal from "../components/ValidationModal";
import ModifyProfilePic from "../components/ModifyProfilePic";
import RedButton from "../components/RedButton";
import GreyButton from "../components/GreyButton";
import AuthContext from "../context/AuthContext";
import ValidationPicture from "../assets/Validation.png";
import ErrorPicture from "../assets/Erreur.png";

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
  const [reLoad, setReload] = useState(false);
  const [entities, setEntities] = useState([]);
  const [unvalidEmail, setUnvalidEmail] = useState(false);
  const [modalValidationModifyUser, setModalValidationModifyUser] =
    useState(false);
  const [modalErrorModifyUser, setModalErrorModifyUser] = useState(false);

  const [modifyProfileModalOpened, setModifyProfileModalOpened] =
    useState(false);

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    pseudo: "",
    email: "",
    entity_id: "",
  });

  const [password, setPassword] = useState({
    password: "",
  });
  const [password2, setPassword2] = useState({
    password2: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/entities`)
      .then((response) => {
        setEntities(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/loggeduser/${userId}`)
      .then((response) => {
        setLoggedUserData(response.data);
        setIsLoadedUser(true);
        setUser({
          lastname: response.data[0].lastname,
          firstname: response.data[0].firstname,
          pseudo: response.data[0].pseudo,
          email: response.data[0].email,
          entity_id: response.data[0].entity_id,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reLoad]);

  let selectedEntityId;
  const handleSelectChange = (event) => {
    selectedEntityId = event.target.value;
    setUser((prevUser) => ({
      ...prevUser,
      entity_id: selectedEntityId,
    }));
  };

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

  const handleModifyUser = () => {
    if (user.email === loggedUserData[0].email) {
      const temporaryUser = {
        lastname: user.lastname,
        firstname: user.firstname,
        pseudo: user.pseudo,
        entity_id: user.entity_id,
      };
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
          temporaryUser
        )
        .then(() => {
          setModalValidationModifyUser(true);
          setReload(!reLoad);
        })
        .catch((error) => {
          console.error("Erreur lors de la modification sans mail :", error);
          setModalErrorModifyUser(true);
        });
    } else {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, user)
        .then(() => {
          setModalValidationModifyUser(true);
          setReload(!reLoad);
        })
        .catch((error) => {
          console.error("Erreur lors de la modification :", error);
          setModalErrorModifyUser(true);
        });
    }
  };

  function handleInputChange(event) {
    const { id, value, type } = event.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));

    if (type === "email") {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!emailRegex.test(value)) {
        setUnvalidEmail(true);
      } else {
        setUnvalidEmail(false);
      }
    }
  }

  function handlePasswordChange(event) {
    const { id, value } = event.target;
    setPassword((prevPassword) => ({ ...prevPassword, [id]: value }));
  }

  function handlePassword2Change(event) {
    const { id, value } = event.target;
    setPassword2((prevPassword2) => ({ ...prevPassword2, [id]: value }));
  }
  const handleModifyPasswordUser = () => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, password)
      .then(() => {
        setPassword2({ password2: "" });
        setPassword({ password: "" });
        setModalValidationModifyUser(true);
        setReload(!reLoad);
      })
      .catch((error) => {
        console.error("Erreur lors de la modification :", error);
        setPassword2({ password2: "" });
        setPassword({ password: "" });
        setModalErrorModifyUser(true);
      });
  };

  return (
    <div className="ml-7  ">
      {isLoadedUser && (
        <section className="w-full overflow-hidden flex flex-col gap-10 xl:gap-0">
          <div className="w-full items-center flex flex-col xl:flex-row xl:justify-between gap-10 mt-[100px] p-4 xl:p-0">
            <div className="w-full items-center flex flex-col xl:flex-row gap-10 mt-[100px] p-4 xl:p-10">
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
                    className="rounded-full object-cover xl:w-[12vw] xl:h-[12vw] w-[35vw] h-[35vw]"
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setModifyProfileModalOpened(true);
                  }}
                >
                  <div className="bg-[#7F253E] min-w-[120px] min-h-[120px] w-[20vw] h-[20vw] md:w-[15vw] md:h-[15vw] lg:w-[12vw] lg:h-[12vw] xl:w-[12vw] xl:h-[12vw] object-cover rounded-full flex items-center justify-center">
                    <h1 className="text-white text-[50px] xl:text-[70px]">
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
                    key={data.email}
                    className="flex flex-col xl:flex-row flex-wrap w-[90%] xl:w-[80%] gap-5 mt-9"
                  >
                    <h2 className="xl:text-4xl text-2xl text-left font-bold">
                      Modifications
                    </h2>
                    <section className="flex flex-col w-full xl:w-[81.9%] gap-2">
                      <h3 className="text-left">Etablissement</h3>
                      <label htmlFor="entity_id">
                        <select
                          className="border border-gray-300 rounded-[4px] p-1 w-[100%] outline-none"
                          id="entity_id"
                          name="userEntity"
                          onChange={handleSelectChange}
                          value={
                            user.entity_id ||
                            (selectedEntityId &&
                              entities.find(
                                (entity) =>
                                  entity.id === parseInt(selectedEntityId, 10)
                              )?.name)
                          }
                        >
                          <option value="" className="text-gray-400">
                            Sélectionnez une entité
                          </option>
                          {entities.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Adresse email</h3>
                      <label htmlFor="email">
                        <input
                          className="w-full p-2 rounded-lg text-left border-2 border-gray-300  border-solid"
                          type="email"
                          id="email"
                          name="userEmail"
                          placeholder="Saisissez votre adresse email"
                          required
                          onChange={(event) => handleInputChange(event)}
                          value={user.email}
                        />
                        {unvalidEmail ? (
                          <p className="text-red-500 text-sm italic mt-0">
                            Adresse email invalide
                          </p>
                        ) : null}
                      </label>
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Pseudo</h3>
                      <label htmlFor="pseudo">
                        <input
                          className="w-full p-2 rounded-lg text-left border-2 border-gray-300  border-solid"
                          type="text"
                          id="pseudo"
                          name="userPseudo"
                          placeholder="Saisissez votre pseudo"
                          onChange={(event) => handleInputChange(event)}
                          value={user.pseudo}
                        />
                      </label>
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Prénom</h3>
                      <label htmlFor="firstname">
                        <input
                          className="w-full p-2 rounded-lg text-left border-2 border-gray-300  border-solid"
                          type="text"
                          id="firstname"
                          maxLength={255}
                          name="userFirstname"
                          placeholder="Saisissez votre prénom"
                          onChange={(event) => handleInputChange(event)}
                          value={user.firstname}
                        />
                      </label>
                    </section>
                    <section className="flex flex-col xl:w-[40%] w-full gap-2">
                      <h3 className="text-left">Nom</h3>
                      <label htmlFor="lastname">
                        <input
                          className="w-full p-2 rounded-lg text-left border-2 border-gray-300  border-solid"
                          type="text"
                          id="lastname"
                          name="userLastname"
                          placeholder="Saisissez votre nom"
                          maxLength={255}
                          onChange={(event) => handleInputChange(event)}
                          value={user.lastname}
                        />
                      </label>
                    </section>
                  </div>
                );
              })}
          </section>
          <div className="xl:w-[15%] w-full mx-auto h-11 xl:ml-20 mt-5 block">
            <RedButton
              text="Enregistrer les modifications"
              type="button"
              onClick={handleModifyUser}
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
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 rounded-lg text-left border-2 border-gray-300  border-solid"
                    placeholder="****"
                    onChange={(event) => handlePasswordChange(event)}
                    value={password.password}
                  />
                </section>
                <section className="flex flex-col xl:w-[40%] w-full gap-2">
                  <h3 className="text-left">
                    Confirmer mon nouveau mot de passe
                  </h3>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    className="w-full p-2 rounded-lg text-left border-2 border-gray-300 border-solid"
                    placeholder="****"
                    onChange={(event) => handlePassword2Change(event)}
                    value={password2.password2}
                  />
                </section>
              </div>
              {password.password !== password2.password2 &&
                password2.password2 !== "" && (
                  <p className="text-red-500">
                    Les mots de passe ne correspondent pas
                  </p>
                )}
            </div>
          </section>
          <div className="xl:w-[15%] w-full h-11 xl:ml-20 mt-5 xl:mb-16 block">
            <RedButton
              text="Modifier le mot de passe"
              type="button"
              onClick={handleModifyPasswordUser}
              disabled={
                password2.password2 === "" ||
                password.password !== password2.password2
              }
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

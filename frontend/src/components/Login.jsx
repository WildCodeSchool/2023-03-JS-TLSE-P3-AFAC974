import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from "react-modal";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Input from "./Input";
import userSample from "../assets/user_sample.png";
import AuthContext from "../context/AuthContext";

function Login({ loginModalOpened, setLoginModalOpened }) {
  const { setUserRole, setUserId } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [userImage, setUserImage] = useState("");

  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    pseudo: "",
    email: "",
    image: "",
    password: "",
    role: 1,
    entity_id: "",
    user_picture: "",
  });

  const inputRef = useRef();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  function handleNext() {
    setCurrentStep(currentStep + 1);
  }

  function handlePrev() {
    setCurrentStep(currentStep - 1);
  }
  const handleInputChangeLogin = (event) => {
    const { id, value } = event.target;
    setUserLogin((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function handleInputChange(event) {
    const { id, value, files, name } = event.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));

    if (name === "image") {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setUserImage(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  function submitSigninModal() {
    setCurrentStep(1);
    setLoginModalOpened(false);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        ...user,
        role: 1,
      })
      .catch((error) => {
        console.error(error);
      });
    setUser({});
    setUserImage("");
  }

  function submitLoginModal() {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/login`, userLogin)
      .then((response) => {
        const { token } = response.data;
        Cookies.set("jwt", token, { secure: true, sameSite: "strict" });
        const jwtToken = Cookies.get("jwt");

        if (jwtToken) {
          const decodedToken = jwtDecode(jwtToken);
          const { role, sub } = decodedToken;
          Cookies.set("role", role);
          Cookies.set("sub", sub);
          setUserRole(role);
          setUserId(sub);
          if (role === 0) {
            navigateTo("/admin");
          } else if (role === 1) {
            navigateTo("/user");
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setCurrentStep(1);
    setLoginModalOpened(false);
    setUserLogin({
      email: "",
      password: "",
    });
  }

  function renderContent() {
    switch (currentStep) {
      case 0:
        return (
          <div className="loginModal flex flex-col items-center gap-5">
            <button type="button">
              <div className="imageCircleContainer w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden ">
                <img
                  src={userSample}
                  alt="profile sample"
                  className="object-cover w-full h-full"
                />
              </div>
            </button>
            <form className="flex flex-col gap-3 w-[70vw] sm:w-[350px]">
              <h3>Email</h3>
              <Input
                id="email"
                type="email"
                placeholder="user@domain.com"
                value={userLogin.email}
                onChange={(event) => handleInputChangeLogin(event)}
              />
              <h3>Mot de passe</h3>
              <Input
                id="password"
                type="password"
                value={userLogin.password}
                onChange={(event) => handleInputChangeLogin(event)}
              />
            </form>
            <button
              onClick={() => submitLoginModal()}
              type="button"
              className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base  hover:font-bold"
            >
              Connexion
            </button>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col items-center gap-5">
            <p className="text-4xl font-semibold">Bienvenue</p>
            <p className="text-xl font-semibold">Choisissez une option</p>
            <div className="flex flex-col gap-3">
              <button
                className="w-[70vw] sm:w-[350px] sm h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base hover:font-bold"
                type="button"
                onClick={() => setCurrentStep(0)}
              >
                <p>Connexion</p>
              </button>
              <button
                className="w-[70vw] sm:w-[350px] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
                onClick={() => setCurrentStep(2)}
                type="button"
              >
                <p>Inscription</p>
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col items-center justify-between gap-5">
            <p className="text-3xl font-semibold text-[#257492]">
              INSCRIPTION 1/3
            </p>
            <form className="flex flex-col gap-3 w-[70vw] sm:w-[350px]">
              <h3>Nom*</h3>
              <label htmlFor="lastname">
                <Input
                  type="text"
                  id="lastname"
                  name="userLastname"
                  placeholder="Saisissez votre nom"
                  onChange={(event) => handleInputChange(event)}
                  value={user.lastname}
                />
              </label>
              <h3>Prénom*</h3>
              <label htmlFor="firstname">
                <Input
                  type="text"
                  id="firstname"
                  name="userFirstname"
                  placeholder="Saisissez votre prénom"
                  onChange={(event) => handleInputChange(event)}
                  value={user.firstname}
                />
              </label>
              <h3>Adresse email*</h3>
              <label htmlFor="email">
                <Input
                  type="email"
                  id="email"
                  name="userEmail"
                  placeholder="Saisissez votre adresse email"
                  onChange={(event) => handleInputChange(event)}
                  value={user.email}
                />
              </label>
              <h3>Etablissement</h3>
              <label htmlFor="entity_id">
                <Input
                  type="text"
                  id="entity_id"
                  name="userEntity"
                  placeholder="Saisissez votre entité"
                  onChange={(event) => handleInputChange(event)}
                  value={user.entity_id}
                />
              </label>
            </form>

            <button
              onClick={() => handleNext()}
              type="button"
              className="w-[70vw] sm:w-[350px] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
            >
              Suivant
            </button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col items-center justify-between gap-5">
            <p className="text-3xl font-semibold text-[#257492]">
              INSCRIPTION 2/3
            </p>
            <form className="flex flex-col gap-3 w-[70vw] sm:w-[350px] ">
              {/* crée les inputs pseudo / mot de passe / confirmer mot de passe */}
              <h3>Pseudo*</h3>
              <label htmlFor="pseudo">
                <Input
                  type="text"
                  id="pseudo"
                  name="userPseudo"
                  placeholder="Saisissez votre pseudo"
                  onChange={(event) => handleInputChange(event)}
                  value={user.pseudo}
                />
              </label>
              <h3>Mot de passe*</h3>
              <label htmlFor="password">
                <Input
                  type="password"
                  id="password"
                  name="userPassword"
                  placeholder="Saisissez votre mot de passe"
                  onChange={(event) => handleInputChange(event)}
                  value={user.password}
                />
              </label>
              <h3>Confirmer mot de passe*</h3>
              <label htmlFor="password">
                <Input
                  type="password"
                  id="password2"
                  name="userConfirmPassword"
                  placeholder="Confirmez votre mot de passe"
                  onChange={(event) => handleInputChange(event)}
                  value={user.password2}
                />
                {user.password !== user.password2 && user.password !== "" && (
                  <p className="text-red-500">
                    Les mots de passe ne correspondent pas
                  </p>
                )}
              </label>
            </form>
            <div className="buttons flex justify-between w-[100%] px-[16px] ">
              <button
                onClick={handlePrev}
                type="button"
                className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
              >
                Précédent
              </button>

              <button
                onClick={() =>
                  user.password !== "" && user.password === user.password2
                    ? handleNext()
                    : null
                }
                type="button"
                className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
              >
                Suivant
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col items-center gap-5">
            <p className="text-3xl font-semibold text-[#257492]">
              INSCRIPTION 3/3
            </p>
            <form
              encType="multipart/form-data"
              className="flex flex-col gap-3 w-[70vw] sm:w-[350px] items-center"
            >
              <div className=" hidden w-full">
                <Input
                  type="file"
                  text="Saisir l'image de l'oeuvre'"
                  id="user_picture"
                  name="image"
                  onChange={(event) => handleInputChange(event)}
                  ref={inputRef}
                />
              </div>
              <label
                htmlFor="user_picture"
                className="flex justify-center w-full items-center cursor-pointer "
              >
                <div className="imageCircleContainer w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] rounded-full overflow-hidden ">
                  <img
                    src={userImage || userSample}
                    alt="choose"
                    className="object-cover w-full h-full"
                  />
                </div>
              </label>
              <h3 className="text-center">
                Choisir une photo de profil
                <br />
                <span className="italic">(optionnel)</span>
              </h3>
            </form>
            <div className="buttons flex justify-between w-[100%] px-[16px] ">
              <button
                onClick={handlePrev}
                type="button"
                className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
              >
                Précédent
              </button>

              <button
                onClick={() => submitSigninModal()}
                type="button"
                className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base  hover:font-bold"
              >
                Terminer
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <ReactModal
      isOpen={loginModalOpened}
      onRequestClose={() => {
        setCurrentStep(1);
        setLoginModalOpened(false);
        setUser({});
        setUserImage(null);
      }}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
        content: {
          backgroundColor: "#fff",
          color: "#000",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px",
          height: "fit-content",
          width: "fit-content",
          maxWidth: "90vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "15px",
        },
      }}
    >
      {renderContent()}
    </ReactModal>
  );
}

Login.propTypes = {
  loginModalOpened: PropTypes.bool.isRequired,
  setLoginModalOpened: PropTypes.func.isRequired,
};

export default Login;

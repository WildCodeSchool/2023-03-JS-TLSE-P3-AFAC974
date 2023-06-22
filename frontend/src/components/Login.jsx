import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import Input from "./Input";

function Login({ loginModalOpened, setLoginModalOpened }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [user, setUser] = useState({
    lastname: "",
    firstname: "",
    pseudo: "",
    email: "",
    entity_id: "",
    password: "",
    role: "",
  });

  function handleNext() {
    setCurrentStep(currentStep + 1);
  }

  function handlePrev() {
    setCurrentStep(currentStep - 1);
  }

  function handleInputChange(event) {
    const { id, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [id]: value }));
  }

  function submitLoginModal() {
    setCurrentStep(1);
    setLoginModalOpened(false);
  }

  function renderContent() {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex flex-col items-center gap-5">
            <p className="text-4xl font-semibold">Bienvenue</p>
            <p className="text-xl font-semibold">Choisissez une option</p>
            <div className="flex flex-col gap-3">
              <button
                className="w-[70vw] sm:w-[350px] sm h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#257492] text-[#E3E4E2] font-semibold text-base hover:font-bold"
                type="button"
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
          <div>
            <p>INSCRIPTION 1/3</p>
            <form>
              <h3>Nom</h3>
              <label htmlFor="lastname">
                <Input
                  type="text"
                  id="lastname"
                  name="userLastname"
                  placeholder="Saisissez votre nom"
                  onChange={() => handleInputChange()}
                  value={user.lastname}
                />
              </label>
              <h3>Prénom</h3>
              <label htmlFor="firstname">
                <Input
                  type="text"
                  id="firstname"
                  name="userFirstname"
                  placeholder="Saisissez votre prénom"
                  onChange={() => handleInputChange()}
                  value={user.firstname}
                />
              </label>
              <h3>Adresse email</h3>
              <label htmlFor="email">
                <Input
                  type="email"
                  id="email"
                  name="userEmail"
                  placeholder="Saisissez votre adresse email"
                  onChange={() => handleInputChange()}
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
                  onChange={() => handleInputChange()}
                  value={user.entity_id}
                />
              </label>
            </form>

            <button onClick={() => handleNext()} type="button">
              Suivant
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <p>INSCRIPTION 2/3</p>
            <form>
              {/* crée les inputs pseudo / mot de passe / confirmer mot de passe */}
              <h3>Pseudo</h3>
              <label htmlFor="pseudo">
                <Input
                  type="text"
                  id="pseudo"
                  name="userPseudo"
                  placeholder="Saisissez votre pseudo"
                  onChange={() => handleInputChange()}
                  value={user.pseudo}
                />
              </label>
              <h3>Mot de passe</h3>
              <label htmlFor="password">
                <Input
                  type="password"
                  id="password"
                  name="userPassword"
                  placeholder="Saisissez votre mot de passe"
                  onChange={() => handleInputChange()}
                  value={user.password}
                />
              </label>
              <h3>Confirmer mot de passe</h3>
              <label htmlFor="password">
                <Input
                  type="password"
                  id="password"
                  name="userConfirmPassword"
                  placeholder="Confirmez votre mot de passe"
                  onChange={() => handleInputChange()}
                  value={user.password}
                />
              </label>
            </form>

            <button onClick={handlePrev} type="button">
              Précédent
            </button>

            <button onClick={handleNext} type="button">
              Suivant
            </button>
          </div>
        );
      case 4:
        return (
          <div>
            <p>INSCRIPTION 3/3</p>
            <form>
              <h3>Choisir une photo de profil</h3>
              <h2>(Optionnel)</h2>
            </form>
            <button onClick={handlePrev} type="button">
              Précédent
            </button>

            <button onClick={() => submitLoginModal()} type="button">
              Terminer
            </button>
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
      }}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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

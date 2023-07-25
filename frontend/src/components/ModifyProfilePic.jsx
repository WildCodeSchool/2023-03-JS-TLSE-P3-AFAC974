import React, { useState, useContext, useRef, useEffect } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import PropTypes from "prop-types";
import Input from "./Input";
import userSample from "../assets/user_sample.png";
import AuthContext from "../context/AuthContext";

function ModifyProfilePic({
  modifyProfileModalOpened,
  setModifyProfileModalOpened,
  setModalValidationModifyUser,
  setModalErrorModifyUser,
}) {
  const {
    userId,
    loggedUserData,
    setLoggedUserData,
    setIsLoadedUser,
    isLoadedUser,
    headers,
  } = useContext(AuthContext);
  const [reLoad, setReload] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [userImageFile, setUserImageFile] = useState(null);

  const inputRef = useRef();
  const [user, setUser] = useState({
    image: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/loggeduser/${userId}`)
      .then((response) => {
        setLoggedUserData(response.data);
        setIsLoadedUser(true);
        setUser({
          image: response.data[0].image,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reLoad]);

  function handleInputChange(event) {
    const { value, files, name } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));

    if (name === "image") {
      const file = files[0];
      const reader = new FileReader();
      setUserImageFile(file);
      reader.onloadend = () => {
        setUserImage(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  const handleModifyProfilePic = () => {
    if (loggedUserData[0].image !== "") {
      const isolationNamePicture =
        loggedUserData[0].image.match(/\/([^/]+)\.[^.]+$/);
      const namePicture = `user-afac/${isolationNamePicture[1]}`;
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/upload`, {
          data: { namePicture },
          headers,
        })
        .then(() => {
          const imageData = new FormData();
          imageData.append("myfile", userImageFile);
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_URL}/upload-users`,
              imageData,
              {
                headers,
              }
            )
            .then((response) => {
              const temporaryUser = {
                ...user,
                image: response.data.imageUrl,
              };
              axios
                .put(
                  `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
                  temporaryUser,
                  {
                    headers,
                  }
                )
                .then(() => {
                  setModalValidationModifyUser(true);
                  setModifyProfileModalOpened(false);
                  setUserImage("");
                  setUserImageFile("");
                  setReload(!reLoad);
                })
                .catch((error) => {
                  setUserImage("");
                  setUserImageFile("");
                  console.error(
                    "Erreur lors de la modification de la photo de profil :",
                    error
                  );
                  setModalErrorModifyUser(true);
                });
            });
        })
        .catch((error) => {
          setUserImage("");
          setUserImageFile("");
          console.error(
            "Erreur lors de la suppression de la photo de profil :",
            error
          );
        });
    } else {
      const imageData = new FormData();
      imageData.append("myfile", userImageFile);
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/upload-users`, imageData, {
          headers,
        })
        .then((response) => {
          const temporaryUser = {
            ...user,
            image: response.data.imageUrl,
          };
          axios
            .put(
              `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
              temporaryUser,
              {
                headers,
              }
            )
            .then(() => {
              setModalValidationModifyUser(true);
              setUserImage("");
              setUserImageFile("");
              setReload(!reLoad);
            })
            .catch((error) => {
              setUserImage("");
              setUserImageFile("");
              console.error(
                "Erreur lors de la modification de la photo de profil :",
                error
              );
              setModalErrorModifyUser(true);
            });
        });
    }
  };

  function renderContent() {
    const loginButtonRef = useRef(null);

    useEffect(() => {
      function handleEnterKey(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          loginButtonRef.current.click();
        }
      }

      document.addEventListener("keydown", handleEnterKey);
      return () => {
        document.removeEventListener("keydown", handleEnterKey);
      };
    }, []);

    return (
      <div className="flex flex-col items-center gap-5">
        {isLoadedUser && loggedUserData && (
          <>
            <p className="text-3xl font-semibold text-[#257492]">
              MODIFICATIONS DE LA PHOTO DE PROFIL
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
              <h3 className="text-center">Choisir une photo de profil</h3>
            </form>
            <div className="buttons flex justify-between w-[100%] px-[16px] ">
              <button
                onClick={() => {
                  setModifyProfileModalOpened(false);
                }}
                type="button"
                className="w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px]   bg-[#E3E4E2] text-[#257492] font-semibold text-base  hover:font-bold"
              >
                Annuler
              </button>

              <button
                onClick={() => handleModifyProfilePic()}
                ref={loginButtonRef}
                type="button"
                className={`${
                  userImageFile
                    ? "bg-[#257492] text-[#E3E4E2] hover:font-bold"
                    : "bg-[#E3E4E2] text-[#257492]"
                } w-[47%] h-[44px] flex justify-center items-center  shadow-xs rounded-lg px-[8px] font-semibold text-base `}
                disabled={!userImageFile}
              >
                Terminer
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <ReactModal
      isOpen={modifyProfileModalOpened}
      onRequestClose={() => {
        setModifyProfileModalOpened(false);
        setUser({
          image: "",
        });
        setUserImage(null);
        setUserImageFile(null);
      }}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          backdropFilter: "blur(6px)",
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

ModifyProfilePic.propTypes = {
  modifyProfileModalOpened: PropTypes.bool.isRequired,
  setModifyProfileModalOpened: PropTypes.func.isRequired,
  setModalValidationModifyUser: PropTypes.func.isRequired,
  setModalErrorModifyUser: PropTypes.func.isRequired,
};

export default ModifyProfilePic;

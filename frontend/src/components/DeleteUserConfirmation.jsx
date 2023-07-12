import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import axios from "axios";
import GreyButton from "./GreyButton";
import RedButton from "./RedButton";
import ValidationModal from "./ValidationModal";

function DeleteUserConfirmation({
  user,
  setDeletedUserId,
  isOpenDeleteConfirmation,
  setIsOpenDeleteConfirmation,
}) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };
  const [isOpenModalValidation, setIsOpenModalValidation] = useState(false);

  const handleDeleteUser = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`)
      .then(() => {
        setIsOpenModalValidation(true);
      })
      // then wait 1800ms
      .then(() => {
        setIsOpenDeleteConfirmation(false);
        setTimeout(() => {
          setDeletedUserId(user.id);
        }, 1800);
      })

      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <ReactModal
        isOpen={isOpenDeleteConfirmation}
        style={customModalStyles}
        ariaHideApp={false}
        onRequestClose={() => {
          setIsOpenDeleteConfirmation(false);
        }}
        shouldCloseOnOverlayClick
        className="h-fit  w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[40vw] lg:max-w-[40vw] border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
      >
        <div className="flex flex-col justify-center items-center w-[100%]">
          <p className="font-semibold text-[20px] py-[10px] text-center">
            Confirmez-vous la suppression de l'utilisateur {user.pseudo} ?
          </p>
          <div className="flex flex-col-reverse justify-between w-[75%]">
            <div className=" w-[100%] py-[5px] text-[16px] h-[55px]">
              <GreyButton
                text="Annuler"
                onClick={() => setIsOpenDeleteConfirmation(false)}
              />
            </div>
            <div className="w-[100%] py-[5px] text-[16px] h-[55px]">
              <RedButton text="Confirmer" onClick={() => handleDeleteUser()} />
            </div>
          </div>
        </div>
      </ReactModal>
      <ValidationModal
        isOpenModalValidation={isOpenModalValidation}
        setModalValidation={setIsOpenModalValidation}
        textValidationModal="Utilisateur supprimé"
      />
    </>
  );
}

DeleteUserConfirmation.propTypes = {
  isOpenDeleteConfirmation: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    pseudo: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  setDeletedUserId: PropTypes.func.isRequired,
  setIsOpenDeleteConfirmation: PropTypes.func.isRequired,
};

export default DeleteUserConfirmation;

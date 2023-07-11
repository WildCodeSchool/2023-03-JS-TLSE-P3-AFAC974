import React from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";
import axios from "axios";
import GreyButton from "./GreyButton";
import RedButton from "./RedButton";

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

  const handleDeleteUser = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`)
      .then(() => {
        setDeletedUserId(user.id);
      });
  };
  return (
    <ReactModal
      isOpen={isOpenDeleteConfirmation}
      style={customModalStyles}
      ariaHideApp={false}
      onRequestClose={() => {
        setIsOpenDeleteConfirmation(false);
      }}
      shouldCloseOnOverlayClick
      className="h-fit md:h-[30vh] lg:h-[35vh] w-fit md:w-[30vw] lg:w-[30vw] lg:max-w-[25vw] border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
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
            <RedButton text="Confirmer" onClick={handleDeleteUser} />
          </div>
        </div>
      </div>
    </ReactModal>
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

import React, { useState } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import GreyButton from "./GreyButton";
import RedButton from "./RedButton";
import ValidationModal from "./ValidationModal";
import RedArrow from "../assets/red-arrow.png";

function StatusChangeConfirmation({
  isOpenStatusChangeConfirmation,
  handleStatusChange,
  setIsOpenStatusChangeConfirmation,
  temporaryStatus,
  status,
  user,
}) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };
  const [isOpenModalValidation, setIsOpenModalValidation] = useState(false);

  return (
    <>
      <ReactModal
        isOpen={isOpenStatusChangeConfirmation}
        style={customModalStyles}
        ariaHideApp={false}
        onRequestClose={() => {
          setIsOpenStatusChangeConfirmation(false);
        }}
        shouldCloseOnOverlayClick
        className="h-fit w-[85vw] sm:w-fit md:w-fit lg:w-[40vw] max-w-[450px] border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
      >
        <div className="flex flex-col justify-center items-center w-full">
          <p className="font-semibold text-[20px] py-[10px] text-center">
            Êtes-vous sûr de vouloir changer le statut de l'utilisateur{" "}
            {user.firstname} {user.lastname} ?
          </p>
          <div className="flex mx-[20px] my-[20px] items-center justify-center w-full text-center font-medium gap-5 sm:gap-10">
            <p className="text-lg border border-solid border-gray-300 rounded-md px-[16px] py-[10px] w-[90px]">
              {status}
            </p>
            <img
              src={RedArrow}
              alt="flèche rouge"
              className="w-[60px] sm:w-[80px] h-fit"
            />
            <p className="text-lg border border-solid border-gray-300 rounded-md px-[16px] py-[10px] w-[90px] text-center font-medium">
              {temporaryStatus}
            </p>
          </div>
          <div className="flex flex-col-reverse justify-between w-[75%]">
            <div className=" w-[100%] py-[5px] text-[16px] h-[55px]">
              <GreyButton
                text="Annuler"
                onClick={() => setIsOpenStatusChangeConfirmation(false)}
              />
            </div>
            <div className="w-[100%] py-[5px] text-[16px] h-[55px]">
              <RedButton
                text="Confirmer"
                onClick={() => {
                  handleStatusChange(temporaryStatus);
                  setIsOpenStatusChangeConfirmation(false);
                  setIsOpenModalValidation(true);
                }}
              />
            </div>
          </div>
        </div>
      </ReactModal>
      <ValidationModal
        isOpenModalValidation={isOpenModalValidation}
        setModalValidation={setIsOpenModalValidation}
        textValidationModal="Statut validé"
      />
    </>
  );
}

StatusChangeConfirmation.propTypes = {
  isOpenStatusChangeConfirmation: PropTypes.bool.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  setIsOpenStatusChangeConfirmation: PropTypes.func.isRequired,
  temporaryStatus: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    pseudo: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default StatusChangeConfirmation;

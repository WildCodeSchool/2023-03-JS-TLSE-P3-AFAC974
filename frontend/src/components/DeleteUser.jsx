import React from "react";
import PropTypes from "prop-types";
import trash from "../assets/trash.png";

function DeleteUser({ setIsOpenDeleteConfirmation }) {
  return (
    <button
      type="button"
      onClick={() => setIsOpenDeleteConfirmation(true)}
      className="flex items-center justify-center text-sm xl:text-base gap-[8px] px-[10px] py-[8px] border border-solid rounded-md w-[40vw] xl:w-auto "
    >
      <p>Supprimer</p>
      <img src={trash} alt="poubelle" className="w-[20px] h-auto" />
    </button>
  );
}

DeleteUser.propTypes = {
  setIsOpenDeleteConfirmation: PropTypes.func.isRequired,
};

export default DeleteUser;

import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import trash from "../assets/trash.png";

function DeleteUser({ user, setDeletedUserId }) {
  const handleDeleteUser = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`)
      .then(() => {
        setDeletedUserId(user.id);
      });
  };
  return (
    <button
      type="button"
      onClick={() => handleDeleteUser()}
      className="flex items-center justify-center text-sm xl:text-base gap-[8px] px-[10px] py-[8px] border border-solid rounded-md w-[40vw] xl:w-auto "
    >
      <p>Supprimer</p>
      <img src={trash} alt="poubelle" className="w-[20px] h-auto" />
    </button>
  );
}

DeleteUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    pseudo: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  setDeletedUserId: PropTypes.func.isRequired,
};

export default DeleteUser;

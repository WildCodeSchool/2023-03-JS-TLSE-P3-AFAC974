import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

function DeleteUser({ user }) {
  const handleDeleteUser = () => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`);
  };
  return (
    <button type="button" onClick={() => handleDeleteUser()}>
      Supprimer
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
};

export default DeleteUser;

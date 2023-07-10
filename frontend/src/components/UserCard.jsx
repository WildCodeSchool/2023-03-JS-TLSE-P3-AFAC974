import React, { useState } from "react";
import PropTypes from "prop-types";

function UserCard({ user }) {
  const [status, setStatus] = useState("User");
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="flex mx-[100px] ">
      <div>{user.lastname}</div>
      <div className="self-center mx-auto">
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={handleStatusChange}
        />
        <select value={status} onChange={handleStatusChange}>
          <option value="">Sélectionnez un statut</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Ban">Ban</option>
        </select>
      </div>
      <div>
        <p>Bouton supprimer</p>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    pseudo: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default UserCard;

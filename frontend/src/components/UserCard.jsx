import React, { useState } from "react";
import PropTypes from "prop-types";

function UserCard({ user }) {
  const [status, setStatus] = useState("User");
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row w-full items-center justify-center">
      <div className="flex flex-1 justify-start">{user.pseudo}</div>
      <div className="flex flex-1 items-center justify-center">
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
      <div className="flex flex-1 justify-end">
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

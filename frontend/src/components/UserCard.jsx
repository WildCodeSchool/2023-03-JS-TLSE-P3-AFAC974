import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import DeleteUser from "./DeleteUser";

function UserCard({ user }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => {
    let fetchedStatus;
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`)
      .then((res) => {
        switch (res.data[0].role) {
          case 0:
            fetchedStatus = "Admin";
            break;
          case 1:
            fetchedStatus = "User";
            break;
          case 2:
            fetchedStatus = "Ban";
            break;
          default:
            break;
        }
        setStatus(fetchedStatus);
        setIsLoaded(true);
      });
  });

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    switch (event.target.value) {
      case "Admin":
        axios
          .put(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`, {
            role: 0,
          })
          .catch((err) => {
            console.error(err);
          });
        break;
      case "User":
        axios
          .put(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`, {
            role: 1,
          })
          .catch((err) => {
            console.error(err);
          });
        break;
      case "Ban":
        axios
          .put(`${import.meta.env.VITE_BACKEND_URL}/users/${user.id}`, {
            role: 2,
          })
          .catch((err) => {
            console.error(err);
          });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {isLoaded ? (
        <div className="flex flex-col sm:flex-row w-full items-center justify-center">
          <div className="flex flex-1 justify-start">{user.pseudo}</div>
          <div className="flex flex-1 gap-2 items-center justify-center">
            <p>Status</p>
            <select
              value={status}
              onChange={handleStatusChange}
              className="w-[150px]"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Ban">Ban</option>
            </select>
          </div>
          <div className="flex flex-1 justify-end">
            <DeleteUser user={user} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    pseudo: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default UserCard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import DeleteUser from "./DeleteUser";

function UserCard({ user, setDeletedUserId }) {
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
        <div className="flex flex-col xl:flex-row xl:justify-between w-full items-center gap-[15px] py-[20px]">
          <div className="flex text-2xl font-semibold xl:w-[20%]">
            {user.pseudo}
          </div>
          <div className="flex gap-2 items-center justify-center xl:gap-[30vw]">
            <div className="flex items-center justify-center text-base gap-[8px] px-[10px] py-[8px] border border-solid border-gray-300 rounded-md w-[40vw] xl:w-auto">
              <p className="text-sm xl:text-base whitespace-nowrap">Status :</p>
              <select
                value={status}
                onChange={handleStatusChange}
                className="text-sm xl:text-base"
              >
                <option value="User" className="text-center ">
                  User
                </option>
                <option value="Admin" className="text-center">
                  Admin
                </option>
                <option value="Ban" className="text-center align-middle">
                  Ban
                </option>
              </select>
            </div>
            <div className="flex justify-end">
              <DeleteUser user={user} setDeletedUserId={setDeletedUserId} />
            </div>
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
  setDeletedUserId: PropTypes.func.isRequired,
};

export default UserCard;

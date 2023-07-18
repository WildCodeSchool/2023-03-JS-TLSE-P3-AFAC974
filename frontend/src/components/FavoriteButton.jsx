import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import FavIcon from "../assets/heart.svg";
import RedFavIcon from "../assets/heart_red.svg";

function FavoriteButton({ artworkId }) {
  const { userRole, userId } = React.useContext(AuthContext);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/user/${userId}/artwork/${artworkId}`
      )
      .then((response) => {
        if (response.data[0]) {
          setFavorite(true);
        } else {
          console.info("not favorite");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [favorite]);

  const toggleFavorite = () => {
    if (favorite) {
      axios
        .delete(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/${userId}/artwork/${artworkId}/favorite`
        )
        .then(() => {
          setFavorite(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/${userId}/artwork/${artworkId}/favorite`
        )
        .then(() => {
          setFavorite(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      {userRole === 1 && (
        <button
          onClick={toggleFavorite}
          type="button"
          className="h-6 w-6 md:h-8 md:w-8"
        >
          {favorite ? (
            <img src={RedFavIcon} alt="fav" />
          ) : (
            <img src={FavIcon} alt="not fav" />
          )}
        </button>
      )}
    </div>
  );
}

FavoriteButton.propTypes = {
  artworkId: PropTypes.number.isRequired,
};
export default FavoriteButton;

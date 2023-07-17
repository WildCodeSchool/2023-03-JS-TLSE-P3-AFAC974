import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import FavIcon from "../assets/heart.svg";
import RedFavIcon from "../assets/heart_red.svg";

function FavoriteButton({ artworkId }) {
  const { userRole, userId } = React.useContext(AuthContext);
  const [favorite, setFavorite] = useState(false);
  //  const [favData, setFavData] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}/artworks/favorites`
      )
      .then((response) => {
        console.info(response.data[0]);
        //        setFavData(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [artworkId, userId]);

  const toggleFavorite = () => {
    if (favorite) {
      axios
        .delete(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/${userId}/artworks/${artworkId}/favorite`
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
          }/user/${userId}/artworks/${artworkId}/favorite`,
          {
            userId,
            artworkId,
          }
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
  artworkId: PropTypes.number,
};
export default FavoriteButton;

FavoriteButton.defaultProps = {
  artworkId: 0,
};

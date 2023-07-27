import PropTypes from "prop-types";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import FavIcon from "../assets/heart.svg";
import RedFavIcon from "../assets/heart_red.svg";

function FavoriteButton({ artworkId, text }) {
  const { userRole, userId, headers } = useContext(AuthContext);
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/user/${userId}/artwork/${artworkId}`,
        { headers }
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
  }, []);

  const toggleFavorite = () => {
    if (favorite) {
      axios
        .delete(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/user/${userId}/artwork/${artworkId}/favorite`,
          {
            headers,
          }
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
          }/user/${userId}/artwork/${artworkId}/favorite`,
          {},
          {
            headers,
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
    <div className="flex items-center gap-3">
      {userRole === 1 && (
        <>
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
          <div>
            {text && favorite && (
              <p className="invisible lg:visible lg:text-[21px] lg:font-semibold">
                Retirer des favoris
              </p>
            )}
            {text && !favorite && (
              <p className="invisible lg:visible lg:text-[21px] lg:font-semibold">
                Ajouter aux favoris
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

FavoriteButton.propTypes = {
  artworkId: PropTypes.number.isRequired,
  text: PropTypes.string,
};

FavoriteButton.defaultProps = {
  text: "",
};

export default FavoriteButton;

import React, { useState } from "react";
import FavIcon from "../assets/heart.svg";
import RedFavIcon from "../assets/heart_red.svg";

function FavoriteButton() {
  const [favorite, setFavorite] = useState(false);

  const handleFavoriteStatus = () => {
    setFavorite(!favorite);
  };

  return (
    <div>
      <button
        onClick={handleFavoriteStatus}
        type="button"
        className="h-6 w-6 md:h-8 md:w-8"
      >
        {favorite ? (
          <img src={RedFavIcon} alt="fav" />
        ) : (
          <img src={FavIcon} alt="fav" />
        )}
      </button>
    </div>
  );
}

export default FavoriteButton;

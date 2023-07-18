import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import SortBy from "../components/SortBy";

function UserFavorite() {
  const [artworksToMap, setArtworksToMap] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { userId } = React.useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}/artworks/favorites`
      )
      .then((response) => {
        const favData = response.data;
        const fetchArtworksPromises = favData.map((fav) =>
          axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/artworks/${fav.artwork_id}`
          )
        );
        Promise.all(fetchArtworksPromises)
          .then((artworksResponses) => {
            const artworksData = artworksResponses.map((res) => res.data[0]);
            setArtworksToMap(artworksData);
            setIsLoaded(true);
          })
          .catch((error) => {
            console.error(error);
            setIsLoaded(true);
          });
      })
      .catch((error) => {
        console.error(error);
        setIsLoaded(true);
      });
  }, []);

  return (
    isLoaded && (
      <div className="flex flex-col justify-center">
        <div className="px-[20px] mt-[150px] flex flex-row justify-between">
          <h1 className="font-semibold text-4xl text-slate-300">
            Mes Favoris ({artworksToMap.length})
          </h1>
          <SortBy />
        </div>
        {artworksToMap.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col justify-center items-center"
            >
              <Link to={`/artwork/${item.artworkId}`}>
                <div className="flex flex-col justify-center items-center">
                  <img src={item.image_url_medium} alt="artwork" />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    )
  );
}

export default UserFavorite;

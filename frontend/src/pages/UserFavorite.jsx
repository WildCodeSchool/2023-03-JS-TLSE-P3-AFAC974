import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import SortBy from "../components/SortBy";

function UserFavorite() {
  const [favData, setFavData] = useState([]);
  const [setFavArts] = useState([]);
  const { userId } = React.useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/user/${userId}/artworks/favorites`
      )
      .then((response) => {
        console.info(response.data);
        setFavData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks`)
      .then((response) => {
        setFavArts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <div className="px-[20px] mt-[150px] flex flex-row justify-between">
        <h1 className="font-semibold text-4xl text-slate-300">
          Mes Favoris ({favData.length})
        </h1>
        <SortBy />
      </div>
      {favData.map((item) => {
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
  );
}

export default UserFavorite;

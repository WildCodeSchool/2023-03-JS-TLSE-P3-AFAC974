import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FavIcon from "../assets/heart.svg";
import RedFavIcon from "../assets/heart_red.svg";

export default function Gallery() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists`)
      .then((res) => {
        setData2(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filterAndSortData = () => {
    let sortedData = [...data];
    if (searchTerm) {
      sortedData = sortedData.filter((item) => {
        if (typeof item.name === "string") {
          return item.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    }

    if (filter === "asc") {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter === "desc") {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    }
    return sortedData;
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filteredAndSorted = filterAndSortData();
    setFilteredAndSortedData(filteredAndSorted);
  }, [data, searchTerm, filter]);

  const handleFavoriteStatus = (artworkId) => {
    setFavorite((prevFavorite) => {
      if (prevFavorite.includes(artworkId)) {
        return prevFavorite.filter((id) => id !== artworkId);
      }
      return [...prevFavorite, artworkId];
    });
  };

  return (
    <div className="flex flex-col pt-[60px] justify-center items-center">
      <div className="w-[90%] md:w-[95%] justify-center">
        <div className="flex flex-col justify-between items-center">
          <h1 className="underline font-semibold text-[42px] drop-shadow-xl pb-4">
            Galerie
          </h1>
          <p className="text-left">
            Ici, vous pouvez consulter la galerie de l'AFAC 974, les oeuvres ne
            sont pas libres de droit et sont la propriété exclusive de leur(s)
            auteur(s).
          </p>
          <p className="text-[21px] py-4">Rechercher :</p>
          <div className="flex flex-row justify-center items-center gap-2">
            <input
              type="text"
              placeholder="Rechercher une oeuvre..."
              className="border-solid border-2 border-gray-300 py-1 pl-2 rounded-md my-2"
              value={searchTerm}
              onChange={handleInputChange}
            />
          </div>
          <select
            name="select"
            className="border-solid border-2 border-gray-300 p-1 rounded-md mt-2 mb-6"
            onChange={handleChange}
            defaultValue="default"
          >
            <option value="default" disabled>
              Ordre
            </option>
            <option value="asc">Alphabétique</option>
            <option value="desc">Inversé</option>
          </select>
        </div>
        <div className="flex flex-col justify-center md:flex-row md:grid md:grid-cols-4 md:gap-5">
          {filteredAndSortedData.map((artwork) => (
            <div className="pb-4 flex flex-col" key={artwork.id}>
              <div>
                <Link to={`/gallery/${artwork.id}`}>
                  <img
                    src={artwork.image_url_medium}
                    alt={`art${artwork.id}`}
                    className="flex justify-center shadow-xl mb-2"
                  />
                </Link>
                <div className="flex flex-row justify-between h-[100%]">
                  <div className="flex flex-col">
                    <p className="text-left">{`${artwork.name}, ${artwork.year}`}</p>
                    {data2.map((artist) => {
                      if (artist.id === artwork.artist_id) {
                        return (
                          <p className="text-left mb-4 text-gray-600">
                            {artist.nickname}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className="flex flex-row justify-end">
                    <button
                      onClick={() => handleFavoriteStatus(artwork.id)}
                      type="button"
                      className="h-6 w-6"
                    >
                      {favorite.indexOf(artwork.id) !== -1 ? (
                        <img src={RedFavIcon} alt="fav" />
                      ) : (
                        <img src={FavIcon} alt="fav" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

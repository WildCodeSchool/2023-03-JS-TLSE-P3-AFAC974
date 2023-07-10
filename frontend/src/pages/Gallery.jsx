import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SortBy from "../components/SortBy";
import SearchBar from "../components/SearchBar";
import FavIcon from "../assets/heart.svg";
import RedFavIcon from "../assets/heart_red.svg";

export default function Gallery() {
  const [dataArtwork, setDataArtwork] = useState([]);
  const [dataArtist, setDataArtist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks`)
      .then((res) => {
        setDataArtwork(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists`)
      .then((res) => {
        setDataArtist(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filterAndSortData = () => {
    let sortedData = [...dataArtwork];
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
  }, [dataArtwork, searchTerm, filter]);

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
      <div className="px-[20px] flex flex-col items-center justify-center">
        <div className="flex flex-col justify-between items-center w-full">
          <h1 className="underline font-semibold text-[42px] drop-shadow-xl pb-4 md:pt-10">
            Galerie
          </h1>
          <p className="text-left mb-4">
            Ici, vous pouvez consulter la galerie de l'AFAC 974, les oeuvres ne
            sont pas libres de droit et sont la propriété exclusive de leur(s)
            auteur(s).
          </p>
          <p className="text-[21px] py-4 md:invisible">Rechercher :</p>
          <div className="flex flex-col justify-center items-center gap-2 md:flex md:flex-row md:justify-between md:w-full md:items-center md:mb-6">
            <div className="flex flex-col md:flex md:flex-row-reverse md:justify-between md:w-[57%]">
              <SearchBar
                searchTerm={searchTerm}
                handleInputChange={handleInputChange}
              />
              <SortBy handleChange={handleChange} />
            </div>
            <p className="invisible" />
          </div>
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
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p className="text-left">{`${artwork.name}, ${artwork.year}`}</p>
                    {dataArtist.map((artist) => {
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
                      {favorite.includes(artwork.id) ? (
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

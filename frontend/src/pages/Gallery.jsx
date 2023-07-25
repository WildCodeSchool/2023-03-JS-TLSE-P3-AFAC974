import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SortBy from "../components/SortBy";
import SearchBar from "../components/SearchBar";
import AuthContext from "../context/AuthContext";
import FavoriteButton from "../components/FavoriteButton";

export default function Gallery() {
  const placeholder = "Rechercher une oeuvre ...";
  const [dataArtworks, setDataArtworks] = useState([]);
  const [dataArtist, setDataArtist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const { userRole } = React.useContext(AuthContext);
  const artworksPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [colorConnected, setColorConnected] = useState("#257492");

  useEffect(() => {
    if (userRole === 1 || userRole === 0) {
      setColorConnected("#7F253E");
    }
  }, [userRole]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks`)
      .then((res) => {
        setDataArtworks(res.data);
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
    let sortedData = [...dataArtworks];
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
  }, [dataArtworks, searchTerm, filter]);

  const disableRightClick = (e) => {
    e.preventDefault();
  };

  const indexOfLastArtwork = currentPage * artworksPerPage;
  const indexOfFirstArtwork = indexOfLastArtwork - artworksPerPage;
  const currentArtworks = filteredAndSortedData.slice(
    indexOfFirstArtwork,
    indexOfLastArtwork
  );

  const totalPages = Math.ceil(filteredAndSortedData.length / artworksPerPage);

  const handlePageClick = (pageNumber) => {
    window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col pt-[60px] justify-center items-center">
      <div className="px-[20px] justify-center">
        <div className="flex flex-col justify-between items-center">
          <h1 className="font-semibold text-[42px] drop-shadow-xl pb-4">
            Galerie
          </h1>
          <p className="text-left">
            Ici, vous pouvez consulter la galerie de l'AFAC 974, les oeuvres ne
            sont pas libres de droit et sont la propriété exclusive de leur(s)
            auteur(s).
          </p>
          <p className="text-[21px] py-4">Rechercher :</p>
          <div className="flex flex-col justify-center items-center gap-4 mt-2 mb-6 md:flex-row-reverse md:mt-5 md:pb-8 md:w-full md:justify-between">
            <div className="sm:invisible md:visible md:bg-white md:w-[125px] md:h-[35px]" />
            <SearchBar
              placeholder={placeholder}
              searchTerm={searchTerm}
              handleInputChange={handleInputChange}
            />
            <SortBy handleChange={handleChange} />
          </div>
        </div>
        <div className="flex flex-col justify-center md:flex-row md:grid md:grid-cols-4 md:gap-5">
          {currentArtworks.map((artwork) => (
            <div className="pb-4 flex flex-col" key={artwork.id}>
              <div>
                <Link to={`/gallery/${artwork.id}`}>
                  <img
                    src={artwork.image_url_medium}
                    alt={`art${artwork.id}`}
                    className="flex justify-center shadow-xl"
                    onContextMenu={disableRightClick}
                  />
                </Link>
                <div className="flex flex-row justify-between mt-4">
                  <div className="flex flex-col">
                    <p className="text-left">{`${artwork.name}, ${artwork.year}`}</p>
                    {dataArtist.map((artist) => {
                      if (artist.id === artwork.artist_id) {
                        return (
                          <p
                            key={artist.id}
                            className="text-left mb-4 text-gray-600"
                          >
                            {artist.nickname}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </div>
                  {userRole === 1 && (
                    <div className="flex flex-row justify-end">
                      <FavoriteButton artworkId={artwork.id} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {pageNumbers.length > 1 && (
          <div className="flex justify-center items-center mt-4">
            {pageNumbers.map((pageNumber) => (
              <button
                type="button"
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`${
                  currentPage === pageNumber
                    ? `bg-[${colorConnected}] text-white`
                    : "bg-white"
                } border border-[${colorConnected}] px-6 py-2 mx-2 rounded mb-8`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

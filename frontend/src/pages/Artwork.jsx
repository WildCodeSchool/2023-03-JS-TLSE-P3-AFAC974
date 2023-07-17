import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import FavoriteButton from "../components/FavoriteButton";
import AuthContext from "../context/AuthContext";

export default function Artwork() {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState([{}]);
  const [artist, setArtist] = useState([{}]);
  const [type, setType] = useState([{}]);
  const [technique, setTechnique] = useState([{}]);
  const [arttrend, setArttrend] = useState([{}]);
  const { userRole } = React.useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks/${artworkId}`)
      .then((res) => {
        const artworkData = res.data[0];
        setArtwork(artworkData);
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/artists/${
              artworkData.artist_id
            }`
          )
          .then((response) => {
            const artistData = response.data[0];
            setArtist(artistData);
          })
          .catch((error) => {
            console.error(error);
          });
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/types/${artworkData.type_id}`
          )
          .then((response) => {
            const typeData = response.data[0];
            setType(typeData);
          })
          .catch((error) => {
            console.error(error);
          });
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/techniques/${
              artworkData.technique_id
            }`
          )
          .then((response) => {
            const techniqueData = response.data[0];
            setTechnique(techniqueData);
          })
          .catch((error) => {
            console.error(error);
          });
        axios
          .get(
            `${import.meta.env.VITE_BACKEND_URL}/arttrends/${
              artworkData.art_trend_id
            }`
          )
          .then((response) => {
            const arttrendData = response.data[0];
            setArttrend(arttrendData);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .then(() => setIsLoaded(true))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const disableRightClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center pt-[100px] px-[20px]">
      <div className="md:w-[85%] lg:w-[95%]">
        <h1 className="invisible h-0 lg:visible lg:h-full lg:text-[70px] lg:font-semibold lg:pb-10">
          {artwork.name}
        </h1>
        <div className="flex flex-col justify-center lg:flex lg:flex-row lg:justify-around lg:mb-12">
          <img
            src={artwork.image_url_medium}
            alt="art1"
            className="shadow-xl lg:w-[65%]"
            onContextMenu={disableRightClick}
          />
          <div className="flex flex-row sm:visible lg:invisible lg:h-0 lg:w-0">
            <div className="flex flex-col justify-start items-start w-full sm:visible lg:invisible">
              <h2 className="pt-[15px] sm:visible lg:invisible">{`${artwork.name}, ${artwork.year}`}</h2>
              {artist.id === artwork.artist_id && <h2>{artist.nickname}</h2>}
            </div>
            {userRole === 1 && (
              <div className="pt-[15px]">
                {isLoaded && <FavoriteButton artworkId={artwork.id} />}
              </div>
            )}
          </div>
          <div className="flex flex-row justify-center lg:flex lg:flex-col">
            <div className="flex flex-col justify-around w-[70%] lg:w-[100%]">
              <div className="flex flex-col justify-center lg:w-[100%] lg:flex lg:flex-col-reverse">
                <div className="h-0 lg:h-full lg:flex lg:flex-col lg:justify-center">
                  <div className="invisible lg:visible lg:flex lg:flex-row lg:justify-center lg:gap-6 lg:pt-4">
                    {isLoaded && <FavoriteButton artworkId={artwork.id} />}
                    <p className="invisible lg:visible lg:text-[21px] lg:font-semibold">
                      Ajouter au favoris
                    </p>
                  </div>
                </div>
                <hr className=" bg-black border-t-2 justify-center mt-8 mb-4 lg:mt-4" />
                <div className="flex flex-row justify-evenly w-[100%]">
                  <div className="flex flex-col justify-center items-center gap-2">
                    {type.id === artwork.type_id && <h2>{type.name}</h2>}
                    {technique.id === artwork.technique_id && (
                      <h2>{technique.name}</h2>
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    {arttrend.id === artwork.art_trend_id && (
                      <h2>{arttrend.name}</h2>
                    )}
                    <p>{`${artwork.width_cm} x ${artwork.height_cm} cm`}</p>
                  </div>
                </div>
                <hr className="color-black border-t-2 mt-4 mb-8 lg:mb-4" />
                <div className="flex flex-row justify-center gap-8 mb-8 lg:mb-0 lg:pb-4">
                  <div className="flex items-center">
                    <img
                      src={artist.image_url_medium}
                      alt="artist"
                      className="rounded-full object-cover w-[150px] h-[150px]"
                    />
                  </div>
                  <div className="flex flex-col justify-evenly items-center gap-3">
                    <h1 className="text-[21px]">{artist.nickname}</h1>
                    <Link to={`/artist/${artwork.artist_id}`}>
                      <button
                        type="button"
                        className="bg-[#273590] text-[#e2e3e4] text-[16px] px-[10px] py-[2px] rounded-[8px]"
                      >
                        En savoir plus
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-[21px] font-semibold mb-4">
        Description de l'oeuvre
      </h3>
      <p className="lg:pb-14">" {artwork.description} "</p>
    </div>
  );
}

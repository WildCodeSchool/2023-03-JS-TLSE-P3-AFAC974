import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Artwork() {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState([{}]);
  const [artist, setArtist] = useState([{}]);
  const [type, setType] = useState([{}]);
  const [technique, setTechnique] = useState([{}]);
  const [arttrend, setArttrend] = useState([{}]);

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
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center pt-[100px] px-[20px]">
      <img src={artwork.image_url_medium} alt="art1" className="shadow-xl" />
      <div className="flex flex-col justify-start items-start w-full">
        <h1 className="pt-[15px]">{`${artwork.name}, ${artwork.year}`}</h1>
        {artist.id === artwork.artist_id && <h2>{artist.nickname}</h2>}
      </div>
      <hr className="w-[70%] bg-black border-t-2 mt-8 mb-4" />
      <div className="flex flex-row gap-12">
        <div className="flex flex-col justify-center items-center gap-2">
          {type.id === artwork.type_id && <h2>{type.name}</h2>}
          {technique.id === artwork.technique_id && <h2>{technique.name}</h2>}
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {arttrend.id === artwork.art_trend_id && <h2>{arttrend.name}</h2>}
          <p>{`${artwork.width_cm} x ${artwork.height_cm} cm`}</p>
        </div>
      </div>
      <hr className="w-[70%] color-black border-t-2 mt-4 mb-8" />
      <div className="flex flex-row justify-center h-[100px] w-full gap-8 mb-8">
        <div className="h-full w-[100px] flex items-center">
          <img
            src={artist.image_url_medium}
            alt="artist"
            className="rounded-full bg-cover"
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-[21px]">{artist.nickname}</h1>
          <button
            type="button"
            className="bg-[#273590] text-[#e2e3e4] text-[16px] px-[10px] py-[2px] rounded-[8px]"
          >
            En savoir plus
          </button>
        </div>
      </div>
      <h3 className="text-[21px] mb-4">Description de l'oeuvre</h3>
      <p>" {artwork.description} "</p>
    </div>
  );
}

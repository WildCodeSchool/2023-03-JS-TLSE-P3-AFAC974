import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Artwork() {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState([{}]);
  const [artist, setArtist] = useState([{}]);

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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center pt-[300px]">
      <img src={artwork.image_url_medium} alt="art1" className="w-[90%]" />
      <h1>{`${artwork.name}, ${artwork.year}`}</h1>
      {artist.id === artwork.artist_id && <h2>{artist.nickname}</h2>}
    </div>
  );
}

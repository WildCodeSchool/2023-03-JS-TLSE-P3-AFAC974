import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Carousel from "../components/Carousel";

export default function Artist() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState([]);
  const [artwork, setArtwork] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists/${artistId}`)
      .then((res) => {
        const artistData = res.data[0];
        setArtist(artistData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks`)
      .then((res) => {
        const artworkData = res.data;
        setArtwork(artworkData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredArtworks = artwork.filter(
    (el) => el.artist_id === parseInt(artistId, 10)
  );
  const imageUrls = filteredArtworks.map((el) => el.image_url_medium);

  return (
    <div className="flex flex-col justify-center items-center pt-[90px] px-8">
      <img
        src={artist.image_url_medium}
        alt={`artist${artistId}`}
        className="rounded-full object-cover h-[150px] w-[150px]"
      />
      <h1 className="text-[21px] font-semibold py-8">
        {artist.firstname} {artist.lastname}
      </h1>
      <div className="flex flex-col justify-center">
        <p className="text-left">{artist.description}</p>
        <Link to={artist.website_url}>
          <p className="flex justify-start text-[#257492] py-4">{`En savoir plus sur ${artist.nickname}`}</p>
        </Link>
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-[18px] pt-4 pb-8">SON UNIVERS ARTISTIQUE</h2>
        <div className="flex justify-around bg-[#257492] h-[215px] w-[275px]">
          <Carousel imageUrls={imageUrls} />
        </div>
      </div>
    </div>
  );
}

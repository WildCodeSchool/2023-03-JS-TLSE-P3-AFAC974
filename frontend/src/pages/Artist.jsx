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
  const imageUrls = filteredArtworks.map((el) => [el.image_url_medium, el.id]);

  const disableRightClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col justify-center items-center pt-[90px] px-8">
      <section className="flex gap-[100px] w-full justify-center mt-5">
        <div className="flex flex-col gap-5 ">
          <img
            src={artist.image_url_medium}
            alt={`artist${artistId}`}
            className="rounded-full object-cover h-[150px] w-[150px] block mx-auto"
          />
          <h1 className="text-[21px] font-semibold py-8">{artist.firstname}</h1>
        </div>
        <div className="flex flex-col justify-center gap-5 w-[50%]">
          <p className="text-left">{artist.description}</p>
          <Link to={artist.website_url}>
            <p className="flex justify-start text-[#2A8DD4] py-4">{`En savoir plus sur ${artist.nickname}`}</p>
          </Link>
        </div>
      </section>

      <Carousel imageUrls={imageUrls} disableRightClick={disableRightClick} />
    </div>
  );
}

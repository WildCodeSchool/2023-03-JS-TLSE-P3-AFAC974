import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const AddArtworkContext = createContext();

export function AddArtworkProvider({ children }) {
  const [artist, setArtist] = useState("");
  const [type, setType] = useState("");
  const [artTrend, setArtTrend] = useState("");
  const [technique, setTechnique] = useState("");

  const [artworkPreview, setArtworkPreview] = useState("");
  const [artistPreview, setArtistPreview] = useState("");

  const [formArtwork, setFormArtwork] = useState({
    image_url_small: "",
    image_url_medium: "",
    image_url_large: "",
    name: "",
    year: "",
    description: "",
    art_trend_id: "",
    type_id: "",
    technique_id: "",
    artist_id: "",
    width_cm: "",
    length_cm: "",
    height_cm: "",
  });

  const [formArtist, setFormArtist] = useState({
    image_url_small: "",
    image_url_medium: "",
    image_url_large: "",
    lastname: "",
    firstname: "",
    nickname: "",
    description: "",
    website_url: "",
    facebook_url: "",
    instagram_url: "",
    twitter_url: "",
  });

  const [formType, setFormType] = useState({
    name: "",
  });

  const [formArtTrend, setFormArtTrend] = useState({
    name: "",
  });

  const [formTechnique, setFormTechnique] = useState({
    name: "",
  });

  const [formArtistTechnique, setFormArtistTechnique] = useState({
    artiste_id: "",
    technique_id: "",
  });

  const [formArtTrendArtist, setFormArtTrendArtist] = useState({
    artiste_id: "",
    art_trend_id: "",
  });

  const handleInputChangeType = (event) => {
    const { value } = event.target;
    setFormType((prevFormType) => ({
      ...prevFormType,
      name: value,
    }));
  };

  const handleInputChangeArtTrend = (event) => {
    const { value } = event.target;
    setFormArtTrend((prevFormArtTrend) => ({
      ...prevFormArtTrend,
      name: value,
    }));
  };

  const handleInputChangeTechnique = (event) => {
    const { value } = event.target;
    setFormTechnique((prevFormTechnique) => ({
      ...prevFormTechnique,
      name: value,
    }));
  };

  const handleInputChangeArtwork = (event) => {
    const { name, value, files } = event.target;

    if (name === "image_url_medium") {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setArtworkPreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }

    setFormArtwork((prevFormArtwork) => ({
      ...prevFormArtwork,
      [name]: value,
    }));
  };

  const handleInputChangeArtist = (event) => {
    const { name, value, files } = event.target;

    if (name === "image_url_medium") {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setArtistPreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }

    setFormArtist((prevFormArtist) => ({
      ...prevFormArtist,
      [name]: value,
    }));
  };

  const contextValue = useMemo(
    () => ({
      artist,
      setArtist,
      type,
      setType,
      artTrend,
      setArtTrend,
      technique,
      setTechnique,
      artworkPreview,
      setArtworkPreview,
      artistPreview,
      setArtistPreview,
      formArtwork,
      setFormArtwork,
      formArtist,
      setFormArtist,
      formType,
      setFormType,
      formTechnique,
      setFormTechnique,
      formArtTrend,
      setFormArtTrend,
      formArtTrendArtist,
      setFormArtTrendArtist,
      formArtistTechnique,
      setFormArtistTechnique,
      handleInputChangeArtTrend,
      handleInputChangeArtist,
      handleInputChangeArtwork,
      handleInputChangeTechnique,
      handleInputChangeType,
    }),
    [
      artist,
      setArtist,
      type,
      setType,
      artTrend,
      setArtTrend,
      technique,
      setTechnique,
      artworkPreview,
      setArtworkPreview,
      artistPreview,
      setArtistPreview,
      formArtwork,
      setFormArtwork,
      formArtist,
      setFormArtist,
      formType,
      setFormType,
      formTechnique,
      setFormTechnique,
      formArtTrend,
      setFormArtTrend,
      formArtTrendArtist,
      setFormArtTrendArtist,
      formArtistTechnique,
      setFormArtistTechnique,
      handleInputChangeArtTrend,
      handleInputChangeArtist,
      handleInputChangeArtwork,
      handleInputChangeTechnique,
      handleInputChangeType,
    ]
  );
  return (
    <AddArtworkContext.Provider value={contextValue}>
      {children}
    </AddArtworkContext.Provider>
  );
}

AddArtworkProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

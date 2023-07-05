import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const AddArtworkContext = createContext();

export function AddArtworkProvider({ children }) {
  const [artist, setArtist] = useState("");
  const [type, setType] = useState("");
  const [artTrend, setArtTrend] = useState("");
  const [technique, setTechnique] = useState("");

  const [imagePreview, setImagePreview] = useState("");

  const [formArtwork, setFormArtwork] = useState({
    image: "",
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
    image: "",
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

    if (name === "image") {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
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

    if (name === "image") {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
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
      imagePreview,
      setImagePreview,
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
      imagePreview,
      setImagePreview,
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

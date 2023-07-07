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
    name: "",
    year: "",
    description: "",
    imageUrlSmall: "",
    imageUrlMedium: "",
    imageUrlLarge: "",
    artTrendId: "",
    typeId: "",
    techniqueId: "",
    artistId: "",
    widthCm: "",
    heightCm: "",
    depthCm: "",
    artworkLocation: "",
  });

  const [formArtist, setFormArtist] = useState({
    lastname: "",
    firstname: "",
    nickname: "",
    description: "",
    imageUrlSmall: "",
    imageUrlMedium: "",
    imageUrlLarge: "",
    websiteUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
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
    artistId: "",
    techniqueId: "",
  });

  const [formArtTrendArtist, setFormArtTrendArtist] = useState({
    artistId: "",
    artTrendId: "",
  });

  const handleJointureArtisteTechnique = (event) => {
    const { name, value } = event.target;
    setFormArtistTechnique((prevFormArtistTechnique) => ({
      ...prevFormArtistTechnique,
      [name]: value,
    }));
  };

  const handleJointureArtisteArtTrend = (event) => {
    const { name, value } = event.target;
    setFormArtTrendArtist((prevFormArtTrendArtist) => ({
      ...prevFormArtTrendArtist,
      [name]: value,
    }));
  };
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
  // console.log("formArtTrendArtist:", formArtTrendArtist);
  // console.log("formArtistTechnique:", formArtistTechnique);
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
  const [artisteTechniqueUpload, setArtisteTechniqueUpload] = useState(false);
  const [artTrendArtistUpload, setArtTrendArtistUpload] = useState(false);

  // console.log("artisteTechniqueUpload:", artisteTechniqueUpload);
  // console.log("artTrendArtistUpload:", artTrendArtistUpload);

  const contextValue = useMemo(
    () => ({
      handleJointureArtisteTechnique,
      handleJointureArtisteArtTrend,
      artisteTechniqueUpload,
      setArtisteTechniqueUpload,
      artTrendArtistUpload,
      setArtTrendArtistUpload,
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
      handleJointureArtisteTechnique,
      handleJointureArtisteArtTrend,
      artisteTechniqueUpload,
      setArtisteTechniqueUpload,
      artTrendArtistUpload,
      setArtTrendArtistUpload,
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

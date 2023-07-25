import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const FormArtworkArtistContext = createContext();

export function FormArtworkArtistProvider({ children }) {
  const [artist, setArtist] = useState("");
  const [type, setType] = useState("");
  const [artTrend, setArtTrend] = useState("");
  const [technique, setTechnique] = useState("");
  const [artworkPreview, setArtworkPreview] = useState("");
  const [artistPreview, setArtistPreview] = useState("");
  const [isOpenedBigPicture, setIsOpenedBigPicture] = useState(false);
  const [formArtwork, setFormArtwork] = useState({
    name: "",
    year: 0,
    description: "",
    imageUrlSmall: "",
    imageUrlMedium: "",
    imageUrlLarge: "",
    artTrendId: "",
    typeId: "",
    techniqueId: "",
    artistId: "",
    widthCm: 0,
    heightCm: 0,
    depthCm: 0,
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
  const [artworkPicture, setArtworkPicture] = useState(null);

  const uploadPictureArtwork = (event) => {
    const { name, files } = event.target;
    if (name === "pictureArtwork") {
      const file = files[0];
      const reader = new FileReader();
      setArtworkPicture(file);

      reader.onloadend = () => {
        setArtworkPreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };

  const handleInputChangeArtwork = (event) => {
    const { name, value } = event.target;

    if (
      name === "year" ||
      name === "widthCm" ||
      name === "heightCm" ||
      name === "depthCm"
    ) {
      const numericValue = value.replace(/[^0-9]/g, "");

      setFormArtwork((prevFormArtwork) => ({
        ...prevFormArtwork,
        [name]: numericValue,
      }));
    } else {
      setFormArtwork((prevFormArtwork) => ({
        ...prevFormArtwork,
        [name]: value,
      }));
    }
  };

  const [artistPicture, setArtistPicture] = useState(null);
  const uploadPictureArtist = (event) => {
    const { name, files } = event.target;

    if (name === "pictureArtist") {
      const file = files[0];
      const reader = new FileReader();
      setArtistPicture(file);

      reader.onloadend = () => {
        setArtistPreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  };
  const handleInputChangeArtist = (event) => {
    const { name, value } = event.target;

    setFormArtist((prevFormArtist) => ({
      ...prevFormArtist,
      [name]: value,
    }));
  };

  const [artisteTechniqueUpload, setArtisteTechniqueUpload] = useState(false);
  const [artTrendArtistUpload, setArtTrendArtistUpload] = useState(false);

  const [needToFetch, setNeedToFetch] = useState(false);

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
      formArtTrend,
      setFormArtTrend,
      formTechnique,
      setFormTechnique,
      formArtistTechnique,
      setFormArtistTechnique,
      formArtTrendArtist,
      setFormArtTrendArtist,
      handleJointureArtisteTechnique,
      handleJointureArtisteArtTrend,
      handleInputChangeType,
      handleInputChangeArtTrend,
      handleInputChangeTechnique,
      handleInputChangeArtwork,
      handleInputChangeArtist,
      artisteTechniqueUpload,
      setArtisteTechniqueUpload,
      artTrendArtistUpload,
      setArtTrendArtistUpload,
      needToFetch,
      setNeedToFetch,
      artworkPicture,
      uploadPictureArtwork,
      artistPicture,
      setArtistPicture,
      uploadPictureArtist,
      setArtworkPicture,
      isOpenedBigPicture,
      setIsOpenedBigPicture,
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
      formArtTrend,
      setFormArtTrend,
      formTechnique,
      setFormTechnique,
      formArtistTechnique,
      setFormArtistTechnique,
      formArtTrendArtist,
      setFormArtTrendArtist,
      handleJointureArtisteTechnique,
      handleJointureArtisteArtTrend,
      handleInputChangeType,
      handleInputChangeArtTrend,
      handleInputChangeTechnique,
      handleInputChangeArtwork,
      handleInputChangeArtist,
      artisteTechniqueUpload,
      setArtisteTechniqueUpload,
      artTrendArtistUpload,
      setArtTrendArtistUpload,
      needToFetch,
      setNeedToFetch,
      artworkPicture,
      uploadPictureArtwork,
      artistPicture,
      setArtistPicture,
      uploadPictureArtist,
      setArtworkPicture,
    ]
  );
  return (
    <FormArtworkArtistContext.Provider value={contextValue}>
      {children}
    </FormArtworkArtistContext.Provider>
  );
}

FormArtworkArtistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

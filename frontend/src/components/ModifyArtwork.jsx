import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import ArtworkFormModify from "./ArtworkFormModify/ArtworkFormModify";
import { FormArtworkArtistContext } from "../context/FormArtworkArtistContext";

function ModifyArtwork({
  isOpen,
  setModalOpen,
  setModalConfirmation,
  handleCancel,
  selectedArtworkId,
  selectedTypeId,
  selectedTechniqueId,
  selectedArtTrendId,
  selectedArtistId,
}) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  const {
    setArtisteTechniqueUpload,
    setArtTrendArtistUpload,
    artist,
    artTrend,
    technique,
    handleJointureArtisteTechnique,
    handleJointureArtisteArtTrend,
    needToFetch,
  } = useContext(FormArtworkArtistContext);

  const [isLoadedArtworkId, setIsLoadedArtworkId] = useState(false);
  const [isLoadedArtist, setIsLoadedArtist] = useState(false);
  const [isLoadedType, setIsLoadedType] = useState(false);
  const [isLoadedTechnique, setIsLoadedTechnique] = useState(false);
  const [isLoadedArtTrend, setIsLoadedArtTrend] = useState(false);
  const [isLoadedArtistTechnique, setIsLoadedArtistTechnique] = useState(false);
  const [isLoadedArtTrendArtist, setIsLoadedArtTrendArtist] = useState(false);
  const [dataArtworkId, setDataArtworkId] = useState(false);
  const [dataArtist, setDataArtist] = useState(false);
  const [dataType, setDataType] = useState(false);
  const [dataTechnique, setDataTechnique] = useState(false);
  const [dataArtTrend, setDataArtTrend] = useState(false);
  const [dataArtistTechnique, setDataArtistTechnique] = useState(false);
  const [dataArtTrendArtist, setDataArtTrendArtist] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artworks/${selectedArtworkId}`)
      .then((res) => {
        setDataArtworkId(res.data);
        setIsLoadedArtworkId(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch, selectedArtworkId]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artists`)
      .then((res) => {
        setDataArtist(res.data);
        setIsLoadedArtist(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/type`)
      .then((res) => {
        setDataType(res.data);
        setIsLoadedType(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/technique`)
      .then((res) => {
        setDataTechnique(res.data);
        setIsLoadedTechnique(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/arttrend`)
      .then((res) => {
        setDataArtTrend(res.data);
        setIsLoadedArtTrend(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/artisttechnique`)
      .then((res) => {
        setDataArtistTechnique(res.data);
        setIsLoadedArtistTechnique(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/arttrendartist`)
      .then((res) => {
        setDataArtTrendArtist(res.data);
        setIsLoadedArtTrendArtist(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [needToFetch]);

  const handleSubmit = () => {
    setModalOpen(false);
    setModalConfirmation(true);
  };
  const jointureVerify = () => {
    if (isLoadedArtTrendArtist && isLoadedArtistTechnique) {
      const foundArtTrendArtist = dataArtTrendArtist.some(
        (item) =>
          item.artist_id === parseInt(artist, 10) &&
          item.art_trend_id === parseInt(artTrend, 10)
      );
      setArtTrendArtistUpload(foundArtTrendArtist);

      const foundArtistTechnique = dataArtistTechnique.some(
        (item) =>
          item.artist_id === parseInt(artist, 10) &&
          item.technique_id === parseInt(technique, 10)
      );
      setArtisteTechniqueUpload(foundArtistTechnique);
    }
  };

  const modify = true;

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleCancel}
        style={customModalStyles}
        ariaHideApp={false}
        className="h-fit lg:h-fit min-h-[30vh] sm:min-h-[50vh] max-h-[80vh] lg:max-h-[70vh] w-[60vw] lg:w-[60vw] min-w-[45vw] lg:min-w-[600px] max-w-[90vw] md:max-w-[40vw] lg:max-w-[30vw] border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
      >
        <form className="w-full">
          <ArtworkFormModify
            jointureVerify={jointureVerify}
            nextStep={handleSubmit}
            isLoadedArtist={isLoadedArtist}
            isLoadedType={isLoadedType}
            isLoadedTechnique={isLoadedTechnique}
            isLoadedArtTrend={isLoadedArtTrend}
            isLoadedArtwork={isLoadedArtworkId}
            dataArtwork={dataArtworkId}
            dataArtist={dataArtist}
            dataType={dataType}
            dataTechnique={dataTechnique}
            dataArtTrend={dataArtTrend}
            handleJointureArtisteArtTrend={handleJointureArtisteArtTrend}
            handleJointureArtisteTechnique={handleJointureArtisteTechnique}
            modify={modify}
            selectedTypeId={selectedTypeId}
            selectedTechniqueId={selectedTechniqueId}
            selectedArtTrendId={selectedArtTrendId}
            selectedArtistId={selectedArtistId}
          />
        </form>
      </ReactModal>
    </div>
  );
}

ModifyArtwork.propTypes = {
  isOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  setModalConfirmation: PropTypes.func,
  handleCancel: PropTypes.func.isRequired,
  selectedArtworkId: PropTypes.number,
  selectedTypeId: PropTypes.number,
  selectedTechniqueId: PropTypes.number,
  selectedArtTrendId: PropTypes.number,
  selectedArtistId: PropTypes.number,
};

ModifyArtwork.defaultProps = {
  isOpen: false,
  setModalOpen: () => {},
  setModalConfirmation: () => {},
  selectedArtworkId: 0,
  selectedTypeId: 0,
  selectedTechniqueId: 0,
  selectedArtTrendId: 0,
  selectedArtistId: 0,
};

export default ModifyArtwork;

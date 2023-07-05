import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import ArtworkForm1 from "./ArtworkForm/ArtworkForm1";
import ArtworkForm2 from "./ArtworkForm/ArtworkForm2";
import ArtworkForm3 from "./ArtworkForm/ArtworkForm3";

function AddArtwork({
  isOpen,
  setModalOpen,
  step,
  setStep,
  setModalConfirmation,
}) {
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  // useRef is used for initialize the scroll to the top when you switch
  const modalRef = useRef(null);
  const nextStep = () => {
    setStep(step + 1);
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    if (modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

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
    webSite_url: "",
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

  const [imagePreview, setImagePreview] = useState("");
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

  const handleSubmit = () => {
    setStep(1);
    setModalOpen(false);
    setModalConfirmation(true);
  };

  const handleCancel = () => {
    setStep(1);
    setModalOpen(false);
    setImagePreview("");
    setFormArtwork({
      image: "",
      name: "",
      year: "",
      description: "",
      art_trend_id: "",
      type_id: "",
      technique_id: "",
      artist: "",
      width_cm: "",
      length_cm: "",
      height_cm: "",
    });
    setFormArtist({
      image: "",
      lastname: "",
      firstname: "",
      nickname: "",
      description: "",
      webSite_url: "",
      facebook_url: "",
      instagram_url: "",
      twitter_url: "",
    });
    setFormType({ name: "" });
    setFormArtTrend({ name: "" });
    setFormTechnique({ name: "" });
  };

  const [isLoadedArtist, setIsLoadedArtist] = useState(false);
  const [isLoadedType, setIsLoadedType] = useState(false);
  const [isLoadedTechnique, setIsLoadedTechnique] = useState(false);
  const [isLoadedArtTrend, setIsLoadedArtTrend] = useState(false);
  const [dataArtist, setDataArtist] = useState(false);
  const [dataType, setDataType] = useState(false);
  const [dataTechnique, setDataTechnique] = useState(false);
  const [dataArtTrend, setDataArtTrend] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/artists`)
      .then((res) => {
        setDataArtist(res.data);
        setIsLoadedArtist(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/type`)
      .then((res) => {
        setDataType(res.data);
        setIsLoadedType(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/technique`)
      .then((res) => {
        setDataTechnique(res.data);
        setIsLoadedTechnique(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/arttrend`)
      .then((res) => {
        setDataArtTrend(res.data);
        setIsLoadedArtTrend(true);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);
  const [artist, setArtist] = useState("");
  const [type, setType] = useState("");
  const [artTrend, setArtTrend] = useState("");
  const [technique, setTechnique] = useState("");

  // console.log(formArtwork);
  // console.log(formArtist);
  // console.log(formArtTrend);
  // console.log(formTechnique);
  // console.log(formType);

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <ArtworkForm1
            handleInputChangeArtwork={handleInputChangeArtwork}
            nextStep={nextStep}
            prevStep={handleCancel}
            setStep={setStep}
            setModalOpen={setModalOpen}
            text="Ajouter une image de l'oeuvre"
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        );
      case 2:
        return (
          <ArtworkForm2
            formArtwork={formArtwork}
            handleInputChangeArtwork={handleInputChangeArtwork}
            modalRef={modalRef}
            prevStep={prevStep}
            nextStep={nextStep}
            handleInputChangeArtist={handleInputChangeArtist}
            handleInputChangeType={handleInputChangeType}
            handleInputChangeArtTrend={handleInputChangeArtTrend}
            handleInputChangeTechnique={handleInputChangeTechnique}
            formArtist={formArtist}
            formType={formType}
            formArtTrend={formArtTrend}
            formTechnique={formTechnique}
            isLoadedArtist={isLoadedArtist}
            isLoadedType={isLoadedType}
            isLoadedTechnique={isLoadedTechnique}
            isLoadedArtTrend={isLoadedArtTrend}
            dataArtist={dataArtist}
            dataType={dataType}
            dataTechnique={dataTechnique}
            dataArtTrend={dataArtTrend}
            type={type}
            setType={setType}
            artTrend={artTrend}
            setArtTrend={setArtTrend}
            technique={technique}
            setTechnique={setTechnique}
            artist={artist}
            setArtist={setArtist}
          />
        );
      case 3:
        return (
          <ArtworkForm3
            formArtist={formArtist}
            handleInputChangeArtist={handleInputChangeArtist}
            modalRef={modalRef}
            prevStep={prevStep}
            nextStep={nextStep}
            handleInputChangeArtTrend={handleInputChangeArtTrend}
            handleInputChangeTechnique={handleInputChangeTechnique}
            formType={formType}
            formArtTrend={formArtTrend}
            formTechnique={formTechnique}
            isLoadedTechnique={isLoadedTechnique}
            isLoadedArtTrend={isLoadedArtTrend}
            dataTechnique={dataTechnique}
            dataArtTrend={dataArtTrend}
            artTrend={artTrend}
            setArtTrend={setArtTrend}
            technique={technique}
            setTechnique={setTechnique}
          />
        );
      case 4:
        return (
          <ArtworkForm1
            onClick={handleSubmit}
            prevStep={prevStep}
            setStep={setStep}
            setModalOpen={setModalOpen}
            text="Ajouter une photo de l'artiste"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => {
          setModalOpen(false);
          setStep(1);
          setFormArtwork({
            image: "",
            name: "",
            year: "",
            description: "",
            art_trend_id: "",
            type_id: "",
            technique_id: "",
            artist: "",
            width_cm: "",
            length_cm: "",
            height_cm: "",
          });
          setFormArtist({
            image: "",
            lastname: "",
            firstname: "",
            nickname: "",
            description: "",
            webSite_url: "",
            facebook_url: "",
            instagram_url: "",
            twitter_url: "",
          });
          setFormType({ name: "" });
          setFormArtTrend({ name: "" });
          setFormTechnique({ name: "" });
        }}
        style={customModalStyles}
        ariaHideApp={false}
        className="h-fit lg:h-[610px] min-h-[30vh] sm:min-h-[50vh] max-h-[80vh] lg:max-h-[70vh] w-[60vw] lg:w-[50vw] min-w-[45vw] lg:min-w-[600px] max-w-[90vw] md:max-w-[40vw] lg:max-w-[30vw] border-none rounded-2xl p-5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto bg-white flex"
      >
        <form className="w-full">{renderContent()}</form>
      </ReactModal>
    </div>
  );
}

AddArtwork.propTypes = {
  isOpen: PropTypes.bool,
  setModalOpen: PropTypes.func,
  step: PropTypes.number,
  setStep: PropTypes.func,
  setModalConfirmation: PropTypes.func,
};

AddArtwork.defaultProps = {
  isOpen: false,
  setModalOpen: () => {},
  step: 1,
  setStep: () => {},
  setModalConfirmation: () => {},
};

export default AddArtwork;

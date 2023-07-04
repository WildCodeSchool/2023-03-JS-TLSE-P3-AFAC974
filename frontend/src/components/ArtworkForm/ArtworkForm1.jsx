import React from "react";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";
import ChoosePicture from "../../assets/ChoosePicture.png";

function ArtworkForm1({
  nextStep,
  handleInputChangeArtwork,
  prevStep,
  setStep,
  setModalOpen,
  text,
  imagePreview,
  setImagePreview,
}) {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div />
      <div className="flex justify-center items-center w-full">
        <div className="hidden w-full">
          <Input
            type="file"
            text="Saisir l'image de l'oeuvre"
            name="image"
            id="artwork_picture"
            onChange={handleInputChangeArtwork}
          />
        </div>
        <label
          htmlFor="artwork_picture"
          className="flex justify-center w-full items-center cursor-pointer "
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-[8vh]" />
          ) : (
            <img src={ChoosePicture} alt="choose" className="w-[8vh]" />
          )}
        </label>
      </div>
      <div className="items-bottom justify-end">
        <h3 className="text-center w-full text-[16px]">{text}</h3>
        <div className="flex justify-between py-4 w-full lg:justify-around">
          <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%] ">
            <GreyButton text="Annuler" onClick={prevStep} />
          </div>
          <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%] ">
            <RedButton text="Suivant" onClick={nextStep} />
          </div>
        </div>
      </div>
    </div>
  );
}

ArtworkForm1.propTypes = {
  setStep: PropTypes.func,
  setModalOpen: PropTypes.func,
  text: PropTypes.string,
};

ArtworkForm1.defaultProps = {
  setStep: () => {},
  setModalOpen: () => {},
  text: "",
};

export default ArtworkForm1;

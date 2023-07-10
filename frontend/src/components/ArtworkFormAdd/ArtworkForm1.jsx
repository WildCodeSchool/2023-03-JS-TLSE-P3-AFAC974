import React from "react";
import PropTypes from "prop-types";
import RedButton from "../RedButton";
import GreyButton from "../GreyButton";
import Input from "../Input";
import ChoosePicture from "../../assets/ChoosePicture.png";

function ArtworkForm1({
  onClickNext,
  onClickPrev,
  text,
  textNext,
  textPrev,
  onChange,
  imagePreview,
  name,
}) {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div />
      <div className="flex justify-center items-center w-full">
        <div className="hidden w-full">
          <Input
            type="file"
            text="Saisir l'image de l'oeuvre"
            name={name}
            id="picture"
            onChange={onChange}
          />
        </div>
        <label
          htmlFor="picture"
          className="flex justify-center w-full items-center cursor-pointer "
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-[90%]" />
          ) : (
            <img src={ChoosePicture} alt="choose" className="w-[30%]" />
          )}
        </label>
      </div>
      <div className="items-bottom justify-end">
        <h3 className="text-center w-full text-[16px]">{text}</h3>
        <div className="flex justify-between py-4 w-full lg:justify-around">
          <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%] ">
            <GreyButton text={textPrev} onClick={onClickPrev} />
          </div>
          <div className="px-[10px] w-[100%] h-[30px] lg:w-[30%] ">
            <RedButton text={textNext} onClick={onClickNext} />
          </div>
        </div>
      </div>
    </div>
  );
}

ArtworkForm1.propTypes = {
  onClickNext: PropTypes.func.isRequired,
  onClickPrev: PropTypes.func.isRequired,
  text: PropTypes.string,
  textNext: PropTypes.string,
  textPrev: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  imagePreview: PropTypes.string,
  name: PropTypes.string,
};

ArtworkForm1.defaultProps = {
  text: "",
  textNext: "Suivant",
  textPrev: "Précédent",
  imagePreview: "",
  name: "pictureChoice",
};

export default ArtworkForm1;

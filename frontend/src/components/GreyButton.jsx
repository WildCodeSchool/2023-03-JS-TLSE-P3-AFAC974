import React from "react";
import PropTypes from "prop-types";

function GreyButton({ text, prevStep, handleCancel }) {
  return (
    <button
      className="bg-red-800"
      type="button"
      onClick={prevStep || handleCancel}
    >
      {text}
    </button>
  );
}

GreyButton.propTypes = {
  handleCancel: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default GreyButton;

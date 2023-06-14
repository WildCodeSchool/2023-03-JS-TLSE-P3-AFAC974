import React from "react";
import PropTypes from "prop-types";

function RedButton({ text, nextStep, handleSubmit }) {
  return (
    <button
      className="bg-red-800"
      type="button"
      onClick={nextStep || handleSubmit}
    >
      {text}
    </button>
  );
}

RedButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
export default RedButton;

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
  handleCancel: PropTypes.func,
  prevStep: PropTypes.func,
  text: PropTypes.string,
};

GreyButton.defaultProps = {
  handleCancel: () => {},
  prevStep: () => {},
  text: "",
};

export default GreyButton;

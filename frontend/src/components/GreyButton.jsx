import React from "react";
import PropTypes from "prop-types";

function GreyButton({ text, onClick, type }) {
  return (
    <button type={type ? "submit" : "button"} onClick={onClick}>
      {text}
    </button>
  );
}

GreyButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
};

GreyButton.defaultProps = {
  onClick: () => {},
  text: "",
  type: "button",
};

export default GreyButton;

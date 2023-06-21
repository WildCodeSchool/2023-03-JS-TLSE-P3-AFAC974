import React from "react";
import PropTypes from "prop-types";

function RedButton({ text, onClick, type }) {
  return (
    <button type={type ? "submit" : "button"} onClick={onClick}>
      {text}
    </button>
  );
}

RedButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
};

RedButton.defaultProps = {
  onClick: () => {},
  text: "",
  type: "button",
};
export default RedButton;

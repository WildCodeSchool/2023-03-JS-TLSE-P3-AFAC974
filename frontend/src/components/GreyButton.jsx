import React from "react";
import PropTypes from "prop-types";

function GreyButton({ text, onClick, type }) {
  return (
    <button
      className="w-full h-full text-[#7F253E] bg-[#e2e3e4] px-[10px] py-[2px] rounded-[8px] text-[16px]"
      type={type ? "submit" : "button"}
      onClick={onClick}
    >
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

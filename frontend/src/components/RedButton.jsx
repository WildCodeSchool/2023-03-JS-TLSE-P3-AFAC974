import React from "react";
import PropTypes from "prop-types";

function RedButton({ text, onClick, type }) {
  return (
    <button
      className=" w-full h-full bg-[#7F253E] text-[#e2e3e4] px-[10px] py-[2px] rounded-[8px] text-[16px]"
      type={type ? "submit" : "button"}
      onClick={onClick}
    >
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

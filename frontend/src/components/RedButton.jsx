import React from "react";
import PropTypes from "prop-types";

function RedButton({ text, onClick, type, disabled }) {
  return (
    <button
      className={`${
        disabled
          ? "text-[#7F253E]  bg-[#e2e3e4]"
          : " bg-[#7F253E]  text-[#e2e3e4]"
      } w-full h-full px-[10px] py-[2px] rounded-[8px] text-[16px]`}
      type={type ? "submit" : "button"}
      onClick={onClick}
      disabled={disabled ? true : null}
    >
      {text}
    </button>
  );
}

RedButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

RedButton.defaultProps = {
  onClick: () => {},
  text: "",
  type: "button",
  disabled: false,
};
export default RedButton;

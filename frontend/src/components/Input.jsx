import React from "react";
import PropTypes from "prop-types";

function Input({
  type,
  id,
  name,
  placeholder,
  onChange,
  value,
  inputDisabled,
}) {
  const inputType = () => {
    switch (type) {
      case "file":
        return (
          <input
            className="border border-gray-300 rounded-[4px] p-1 w-[100%] outline-none"
            type="file"
            id={id}
            name={name}
            placeholder={placeholder}
            accept="image/png, image/jpeg"
            onChange={onChange}
          />
        );
      case "email":
        return (
          <input
            className="border border-gray-300 rounded-[4px] p-1 w-[100%] outline-none"
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            size="100"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            onChange={onChange}
            value={value}
            autoComplete="new-email"
          />
        );
      case "url":
        return (
          <input
            className="border border-gray-300 rounded-[4px] p-1 w-[100%] outline-none"
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            size="100"
            pattern="https?://.+"
            onChange={onChange}
            value={value}
          />
        );
      case "password":
        return (
          <input
            className="border border-gray-300 rounded-[4px] p-1 w-[100%] outline-none"
            type={type}
            id={id}
            name={name}
            pattern=".{5,}"
            required
            onChange={onChange}
            value={value}
            autoComplete="new-password"
          />
        );
      default:
        return (
          <input
            className="border border-gray-300 rounded-[4px] p-1 w-[100%] outline-none"
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled={inputDisabled}
          />
        );
    }
  };

  return inputType();
}

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputDisabled: PropTypes.bool,
};

Input.defaultProps = {
  type: "",
  id: "",
  name: "",
  placeholder: "",
  onChange: () => {},
  value: "",
  inputDisabled: false,
};

export default Input;

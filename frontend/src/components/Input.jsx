import React, { useState } from "react";
import PropTypes from "prop-types";

function Input({ text, type, typePicture }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  const inputType = () => {
    if (type === "file") {
      return (
        <input
          className="input"
          type="file"
          name={typePicture}
          accept="image/png, image/jpeg"
          placeholder={text}
          onChange={handleSearch}
          value={searchInput}
        />
      );
    }
    if (type === "email") {
      return (
        <input
          type="email"
          size="100"
          placeholder={text}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          onChange={handleSearch}
          value={searchInput}
        />
      );
    }
    if (type === "url") {
      return (
        <input
          type="url"
          name="url"
          size="100"
          placeholder={text}
          pattern="https?://.+"
          onChange={handleSearch}
          value={searchInput}
        />
      );
    }
    return (
      <input
        className="input"
        type={type}
        placeholder={text}
        onChange={handleSearch}
        value={searchInput}
      />
    );
  };

  return inputType();
}

Input.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  typePicture: PropTypes.string,
};

export default Input;

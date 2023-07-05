/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";

function SelectionInput({
  handleInputChange,
  isLoaded,
  idSelection,
  setIdSelection,
  data,
  name,
  id,
  text,
}) {
  return (
    <div>
      {isLoaded ? (
        <select
          name={name}
          id={id}
          className={!idSelection ? "text-gray-400" : ""}
          value={idSelection || ""}
          onChange={(event) => {
            setIdSelection(event.target.value);
            handleInputChange(event);
          }}
        >
          <option value="" className={idSelection ? "text-gray-400" : ""}>
            {text}
          </option>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nickname || item.name}
            </option>
          ))}
          <option value={data.length + 1}>Autre</option>
        </select>
      ) : null}
    </div>
  );
}

SelectionInput.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  idSelection: PropTypes.string.isRequired,
  setIdSelection: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default SelectionInput;

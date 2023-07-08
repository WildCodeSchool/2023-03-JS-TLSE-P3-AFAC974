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
  handleJointureArtisteTechnique,
  handleJointureArtisteArtTrend,
}) {
  return (
    <div>
      {isLoaded ? (
        <select
          name={name}
          id={id}
          className={`${
            !idSelection ? "text-gray-400" : ""
          } h-[34px] border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%] outline-none`}
          value={idSelection || ""}
          onChange={(event) => {
            setIdSelection(event.target.value);
            handleInputChange(event);
            if (handleJointureArtisteTechnique) {
              handleJointureArtisteTechnique(event);
            }
            if (handleJointureArtisteArtTrend) {
              handleJointureArtisteArtTrend(event);
            }
          }}
        >
          <option
            value=""
            className={`${
              !idSelection ? "text-gray-400" : ""
            }border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%]`}
          >
            {text}
          </option>
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nickname || item.name}
            </option>
          ))}
          <option value={Math.max(...data.map((item) => item.id)) + 1}>
            Autre
          </option>
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
  text: PropTypes.string.isRequired,
  handleJointureArtisteTechnique: PropTypes.func.isRequired,
  handleJointureArtisteArtTrend: PropTypes.func.isRequired,
  data: PropTypes.shape.isRequired,
};

export default SelectionInput;

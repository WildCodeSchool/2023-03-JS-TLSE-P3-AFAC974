import React, { useContext } from "react";
import PropTypes from "prop-types";
import { FormArtworkArtistContext } from "../context/FormArtworkArtistContext";

function SelectionInput({
  handleInputChange,
  isLoaded,
  idSelection,
  setIdSelection,
  data,
  name,
  id,
  text,
  modify,
  isLoadedId,
  dataId,
  dataNameId,
}) {
  const { handleJointureArtisteTechnique, handleJointureArtisteArtTrend } =
    useContext(FormArtworkArtistContext);
  return (
    <div>
      {isLoaded && isLoadedId ? (
        <select
          name={name}
          id={id}
          className={`${modify ? "text-black" : ""} ${
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
          {!modify ? (
            <option
              value=""
              className={`${
                !idSelection ? "text-gray-400" : ""
              }border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%]`}
            >
              {text}
            </option>
          ) : (
            <option
              value={dataId}
              className={`${
                !idSelection ? "text-black" : ""
              }border-solid border-[1px] border-gray-300 rounded-[4px] p-1 w-[100%]`}
            >
              {dataNameId}
            </option>
          )}
          {data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nickname || item.name}
            </option>
          ))}
          {!modify ? (
            <option value={Math.max(...data.map((item) => item.id)) + 1}>
              Autre
            </option>
          ) : null}
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
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        lastname: PropTypes.string,
        firstname: PropTypes.string,
        nickname: PropTypes.string,
        description: PropTypes.string,
        image_url_small: PropTypes.string,
        image_url_medium: PropTypes.string,
        image_url_large: PropTypes.string,
        website_url: PropTypes.string,
        facebook_url: PropTypes.string,
        instagram_url: PropTypes.string,
        twitter_url: PropTypes.string,
      })
    ),
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  ]).isRequired,
  modify: PropTypes.bool,
  isLoadedId: PropTypes.bool.isRequired,
  dataId: PropTypes.string,
  dataNameId: PropTypes.string,
};

SelectionInput.defaultProps = {
  modify: false,
  dataId: null,
  dataNameId: null,
};

export default SelectionInput;

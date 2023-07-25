import React, { useContext } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { FormArtworkArtistContext } from "../context/FormArtworkArtistContext";

function BigPicture({ artwork }) {
  const { isOpenedBigPicture, setIsOpenedBigPicture } = useContext(
    FormArtworkArtistContext
  );
  return (
    <ReactModal
      isOpen={isOpenedBigPicture}
      onRequestClose={() => {
        setIsOpenedBigPicture(false);
        document.body.classList.remove("disable-scroll");
      }}
      ariaHideApp={false}
      className="width-fit fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto min-w-[80vw] sm:min-w-[0vw] bigpicture flex items-center justify-center"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          backdropFilter: "blur(6px)",
        },
        content: {
          backgroundColor: "#fff",
          color: "#000",
          padding: "16px",
          height: "fit-content",
          width: "fit-content",
          borderRadius: "15px",
          maxHeight: "95vh",
          maxWidth: "95vw",
        },
      }}
    >
      <img src={artwork.image_url_medium} alt="tableau choisi" />
    </ReactModal>
  );
}

BigPicture.propTypes = {
  artwork: PropTypes.shape({
    image_url_medium: PropTypes.string.isRequired,
  }).isRequired,
};
export default BigPicture;

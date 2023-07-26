import React, { useContext } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { FormArtworkArtistContext } from "../context/FormArtworkArtistContext";

function BigPicture({ artwork }) {
  const { isOpenedBigPicture, setIsOpenedBigPicture } = useContext(
    FormArtworkArtistContext
  );

  const disableRightClick = (e) => {
    e.preventDefault();
  };

  return (
    <ReactModal
      isOpen={isOpenedBigPicture}
      onRequestClose={() => {
        setIsOpenedBigPicture(false);
        document.body.classList.remove("disable-scroll");
      }}
      ariaHideApp={false}
      className="width-fit height-fit fixed top-1/2 left-1/2 -transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto min-w-[90vw] lg:min-w-[0vw] bigpicture flex flex-col items-center p-[16px]"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
          backdropFilter: "blur(6px)",
        },
        content: {
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: "15px",
          maxHeight: "95vh",
          maxWidth: "95vw",
        },
      }}
    >
      <img
        src={artwork.image_url_medium}
        alt="tableau choisi"
        onContextMenu={disableRightClick}
      />
    </ReactModal>
  );
}

BigPicture.propTypes = {
  artwork: PropTypes.shape({
    image_url_medium: PropTypes.string.isRequired,
  }).isRequired,
};
export default BigPicture;

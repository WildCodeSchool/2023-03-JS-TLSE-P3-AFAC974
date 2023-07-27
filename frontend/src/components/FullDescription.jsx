import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

export default function FullDescription({ partialText, fullText }) {
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    if (fullText.length < 500) {
      setShowFullText(true);
    }
  }, [fullText]);

  return (
    <button
      type="button"
      className="text-left text-lg leading-8"
      onClick={() => setShowFullText(!showFullText)}
    >
      {showFullText ? partialText : fullText}
      {showFullText && (
        <span className="text-[#257492] font-semibold"> Voir plus</span>
      )}
    </button>
  );
}

FullDescription.propTypes = {
  fullText: PropTypes.string,
  partialText: PropTypes.string,
};

FullDescription.defaultProps = {
  fullText: "",
  partialText: "",
};

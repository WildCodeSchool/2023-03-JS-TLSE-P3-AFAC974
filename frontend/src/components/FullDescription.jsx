import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

export default function FullDescription({ partialText, fullText }) {
  const [showFullText, setShowFullText] = useState(false);

  useEffect(() => {
    if (fullText.length > 200) {
      setShowFullText(true);
    } else {
      setShowFullText(false);
    }
  }, [fullText]);

  return (
    <div className="text-left text-lg leading-8">
      {showFullText ? (
        <div>
          <p className="leading-[45px] xl:mt-5 lg:mt-5">
            {partialText}
            <button
              onClick={() => setShowFullText(!showFullText)}
              type="button"
              className="text-left text-lg leading-8"
            >
              <span className="text-[#257492] font-semibold">
                &nbsp;voir plus
              </span>
            </button>
          </p>
        </div>
      ) : (
        <div>
          <p className="leading-[45px] xl:mt-5 lg:mt-5">
            {fullText.length > 100 ? (
              <p>
                {fullText}
                <button
                  onClick={() => setShowFullText(!showFullText)}
                  type="button"
                  className="text-left text-lg leading-8"
                >
                  <span className="text-[#257492] font-semibold">
                    &nbsp;voir moins
                  </span>
                </button>
              </p>
            ) : (
              <p>{fullText}</p>
            )}
          </p>
        </div>
      )}
    </div>
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

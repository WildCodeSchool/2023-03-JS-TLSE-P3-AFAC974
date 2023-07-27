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
    <div className="text-left text-lg leading-8">
      <p>
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
                  {" "}
                  &nbsp; voir plus
                </span>
              </button>
            </p>
          </div>
        ) : (
          <div>
            <p className="leading-[45px] xl:mt-5 lg:mt-5">
              {fullText}
              <button
                onClick={() => setShowFullText(!showFullText)}
                type="button"
                className="text-left text-lg leading-8"
              >
                <span className="text-[#257492] font-semibold">
                  {" "}
                  &nbsp;voir moins
                </span>
              </button>
            </p>
          </div>
        )}
      </p>
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
